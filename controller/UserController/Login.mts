import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../model/UserSchema.mts';
import { z } from 'zod';

const userData = z.object({
    userName: z.string(),
    password: z.string(),
})
async function Login(req: Request, res: Response): Promise<void> {
    try {
        const { userName, password } = req.body;

        const validData = userData.safeParse({ userName, password });

        if (!validData.success) {
            res.status(400).json({ message: validData.error.issues[0]?.message ?? "Invvalid input" });
            return;
        }

        const findUser = await User.findOne({ Name: validData.data.userName });

        if (!findUser) {
            res.status(401).json({ message: "Username not found" });
            return;
        }
        const checkPassword: boolean = await bcrypt.compare(validData.data.password, findUser.Password);

        if (!checkPassword) {
            res.status(403).json({ message: 'Invalid password. Access prohibited' });
            return;
        }

        const AccessToken = jwt.sign(
            { userId: findUser!._id! },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: '60s' }
        );
        const RefreshToken = jwt.sign(
            { userId: findUser!._id! },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: '5min' },
        );

        res.cookie('RefreshToken', RefreshToken, { httpOnly: true, maxAge: 5 * 1000 * 60 });
        console.log('cookie sent');
        res.status(200).json({ message: 'Logged in successfully', AccessToken });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default Login