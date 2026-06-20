import type { Request, Response } from 'express';
import User from '../../model/UserSchema.mts';
async function Logout(req: Request, res: Response) {
    try {
        console.log('request hit ?');
        const userId = req.user!.userId;

        const findUser = await User.findById(userId);
        if (!findUser) {
            res.sendStatus(403);
            return;
        }
        res.clearCookie('RefreshToken', { httpOnly: true });
        res.sendStatus(200);
        console.log('request ended');
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export default Logout