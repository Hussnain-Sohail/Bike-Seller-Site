import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../model/UserSchema.ts';
import 'dotenv';
async function Login(req: Request, res: Response): Promise<void> {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            res.status(400).json({ message: 'All fileds are required for logging in' });
            return;
        }

        const findUser = await User.findOne({ Name: userName });

        if (!findUser) {
            res.status(401).json({ message: "Username not found" });
            return;
        }

        const checkPassword = await bcrypt.compare(password, findUser?.Password!);

        if (!checkPassword) {
            res.status(403).json({ message: 'Invalid password. Access prohibited' });
            return;
        }

        const AccessToken = jwt.sign(
            { userId: findUser?._id! },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: '60s' }
        );
        const RefreshToken = jwt.sign(
            { userId: findUser?._id! },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: '5min' },
        );
        res.cookie('RefreshToken', RefreshToken, { httpOnly: true, maxAge: 5 * 1000 * 60 });
        res.status(200).json({ message: 'Logged In successfully', AccessToken });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}