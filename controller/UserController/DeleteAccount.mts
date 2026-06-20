import type { Request, Response } from 'express';
import User from '../../model/UserSchema.mts';
import Bike from '../../model/BikeSchema.mts';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.CLOUD_API_KEY!,
    api_secret: process.env.CLOUD_API_SECRET!,

});

type NBike = {
    _id: string,
    imagePublicId: string
};
async function DeleteAccount(req: Request, res: Response): Promise<void> {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const userId = req.user!.userId;

        const findUser = await User.findById(userId).populate<{ bikeProduct: NBike[] }>('bikeProduct').session(session);

        if (!findUser) {
            await session.abortTransaction();
            await session.endSession();
            res.status(400).json({ message: "Could not delete account" });
            return;
        }

        if (findUser.bikeProduct.length === 0) {
            await findUser.deleteOne({ session });
            await session.commitTransaction();
            await session.endSession();
            res.clearCookie('RefreshToken');
            res.status(200).json({ message: 'Account deleted successfully' });
            return;
        }

        const idArray = findUser.bikeProduct.map((bike) => {
            return bike._id;
        });

        const imageIdArray = findUser.bikeProduct.map((bike) => {
            return bike.imagePublicId;
        })
        await Bike.deleteMany(
            { _id: { $in: idArray } },
            { session },
        );

        await findUser.deleteOne({ session });

        await session.commitTransaction();
        await session.endSession();

        for (const x of imageIdArray) {
            await cloudinary.uploader.destroy(x);
        }

        res.status(200).json({ message: 'Account deleted' });

    }
    catch (error) {
        console.error(error);
        await session.endSession();
        await session.abortTransaction();
        res.status(500).json({ message: 'Internal server error' });
    }
}
export default DeleteAccount;