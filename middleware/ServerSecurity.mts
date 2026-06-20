import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
async function ServerSecurity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.headers['authorization']) {
            res.status(403).json({ message: 'Invalid token not found. Access denied' });
            return;
        } const authHeader: string = req.headers['authorization'];
        const AccessToken: string = authHeader.split(' ')[1]!;
        if (!AccessToken) {
            res.status(400).json({ message: 'Access denied' });
            return;
        } jwt.verify(
            AccessToken,
            process.env.ACCESS_TOKEN_SECRET!,
            (error, decoded) => {
                if (error) {
                    res.status(403).json({ message: 'Invalid token not found. Access denied' });
                    return;
                }
                req.user = decoded as JwtPayload & {
                    userId: string,
                }
                next();
            }
        );
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export default ServerSecurity;