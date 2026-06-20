import type { Request, Response } from 'express';
import User from '../../model/UserSchema.mts';
import bcrypt from 'bcryptjs';
import z from 'zod';

const userData = z.object({
    oldUsername: z.string(),
    newUsername: z.string(),
    password: z.string().min(6),
});

async function ChangeUserName(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.user!.userId;
        const validData = userData.safeParse(req.body);
        if (!validData.success) {
            res.status(400).json({ message: validData.error.issues[0]?.message ?? 'Invalid data entered' });
            return;
        }

        const findUser = await User.findById(userId);

        if (!findUser) {
            res.status(400).json({ message: 'Could not change Username' });
            return;
        } else if (!(findUser.Name === validData.data.oldUsername)) {
            res.status(400).json({ message: 'Username does not match' });
            return;
        }

        const checkDuplicate = await User.findOne({ Name: validData.data.newUsername });

        if (checkDuplicate) {
            res.status(400).json({ message: `Username ${validData.data.newUsername} is already taken` });
            return;
        }

        const checkPassword = await bcrypt.compare(validData.data.password, findUser.Password);

        if (!checkPassword) {
            res.status(403).json({ message: 'Invalid Passsowrd' });
            return;
        }

        findUser.Name = validData.data.newUsername;

        await findUser.save();

        res.status(200).json({ message: 'Username changed successsfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not change Username' });
    }
}

export default ChangeUserName;