import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../model/UserSchema.mts';

interface userData {
    userName: string,
    age: number,
    password: string,
    address: string,
    contactNumber: string,
}
async function Signup(req: Request, res: Response): Promise<void> {
    try {
        if (!req.body) {
            res.status(400).json({ message: 'Could not Create Account' });
            return;
        }
        const user = req.body as userData;
        if (!user.userName || !user.age || !user.password || !user.address || !user.contactNumber) {
            res.status(400).json({ message: 'All fields are required for Creating an Account' });
            return;
        }

        const checkDuplicate = await User.findOne({ Name: user.userName });

        if (checkDuplicate) {
            res.status(400).json({ message: 'Username is already taken' });
            return;
        } else if (user.age < 18) {
            res.status(400).json({ message: 'You must be atleast 18 to create an Account' });
            return;
        } else if (user.password.length < 6) {
            res.status(400).json({ message: 'Password must be atleast 6 characters long' });
            return;
        }

        const hashedPassword: string = await bcrypt.hash(user.password, 10);

        const newUser = new User({
            Name: user.userName,
            Age: user.age,
            Password: hashedPassword,
            Address: user.address,
            contactNumber: user.contactNumber
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
        res.status(200).json({ message: 'Account created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default Signup