import type { Request, Response } from 'express';
import User from '../../model/UserSchema.mts';
import Bike from '../../model/BikeSchema.mts';

async function SeeUploadedBikes(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(403).json({ message: "Access denied", bikes: [] });
            return;
        }

        const findUser = await User.findById(userId).populate('bikeProduct');

        if (!findUser) {
            res.status(400).json({ message: 'Could not find user', bikes: [] });
            return;
        }

        if (findUser.bikeProduct.length === 0) {
            res.status(400).json({ message: 'No bikes have been uploaded so far', bikes: [] });
            return;
        }

        res.status(200).json({ message: '', bikes: findUser.bikeProduct });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default SeeUploadedBikes;