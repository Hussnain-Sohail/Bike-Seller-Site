import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../model/UserSchema.mts';
import { z } from 'zod';
import { client } from '../../server/server.mts';


const userData = z.object({
    userName: z.string(),
    password: z.string(),
});
async function Login(req: Request, res: Response): Promise<void> {
    try {
        console.log('request recieved ?')
        const validData = userData.safeParse(req.body);

        if (!validData.success) {
            res.status(400).json({ message: validData.error.issues[0]?.message ?? "Invvalid input" });
            return;
        }

        const findUser = await User.findOne({ Name: validData.data.userName });

        if (!findUser) {
            res.status(401).json({ message: "Username not found" });
            return;
        }

        const key = `user:${validData.data.userName}`;
        await client.set(key, 0, { NX: true });

        const totalAttempt = Number(await client.get(key));

        if (totalAttempt >= 3) {
            res.status(403).json({ message: 'Reached maximum password attempts. Please wait 5 seconds to try again' });
            await client.expire(key, 5);
            console.log('free now');
            return;
        }

        const checkPassword: boolean = await bcrypt.compare(validData.data.password, findUser.Password);

        if (!checkPassword) {
            await client.incr(key);
            res.status(403).json({ message: 'Invalid password. Access prohibited' });
            return;
        }

        client.del(key);

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
        res.status(200).json({ message: 'Logged in successfully', AccessToken });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default Login