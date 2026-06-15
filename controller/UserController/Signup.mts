import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../model/UserSchema.mts';
import { z } from 'zod';

const userData = z.object({
    userName: z.string(),
    age: z.number().min(18),
    password: z.string().min(6),
    address: z.string(),
    contactNumber: z.string(),
});
async function Signup(req: Request, res: Response): Promise<void> {
    try {

        const validData = userData.safeParse(req.body);

        if (!validData.success) {
            res.status(400).json({ message: validData.error.issues[0]?.message ?? "Invalid data entered" });
            return;
        }

        const checkDuplicate = await User.findOne({ Name: validData.data.userName });

        if (checkDuplicate) {
            res.status(400).json({ message: 'Username is already taken' });
            return;
        }

        const hashedPassword: string = await bcrypt.hash(validData.data.password, 10);

        const newUser = new User({
            Name: validData.data.userName,
            Age: validData.data.age,
            Password: hashedPassword,
            Address: validData.data.address,
            contactNumber: validData.data.contactNumber
        });

        await newUser.save();

        const AccessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: '60s' },
        );
        const RefreshToken = jwt.sign(
            { userId: newUser._id },
            process.env.Refresh_TOKEN_SECRET!,
            { expiresIn: '5min' },
        );

        res.cookie('RefreshToken', RefreshToken, { httpOnly: true, maxAge: 5 * 1000 * 60 });
        res.status(200).json({ message: 'Account created successfully', AccessToken });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default Signup