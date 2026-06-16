import jwt, { type JwtPayload } from 'jsonwebtoken'
import type { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config();

async function NewAccessTokenProvider(req: Request, res: Response): Promise<void> {
    try {
        console.log('request hit new token')
        const RefreshToen: string = req.cookies.RefreshToken;
        if (!RefreshToen) {
            res.status(400).json({ message: 'Access not allowed' });
            return;
        }
        const decoded = jwt.verify(
            RefreshToen,
            process.env.REFRESH_TOKEN_SECRET!,
        ) as JwtPayload & { userId: string };

        if (!decoded) {
            res.status(400).json({ message: 'Access not allowed' });
            return;
        }

        const NewAccessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "60s" }
        );
        console.log('request ended in new token ?')
        res.status(200).json({ AccessToken: NewAccessToken });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export default NewAccessTokenProvider;