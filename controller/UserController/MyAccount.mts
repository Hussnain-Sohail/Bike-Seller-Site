import type { Request, Response } from 'express';
import User from '../../model/UserSchema.mts';
import Bike from '../../model/BikeSchema.mts';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.CLOUD_API_KEY!,
    api_secret: process.env.CLOUD_API_SECRET!,
});
async function MyAccount(req: Request, res: Response): Promise<void> {
    try {
        console.log('request hit ?');
        const userId = req.user!.userId;
        const findUser = await User.findById(userId);

        if (!findUser) {
            res.status(400).json({ message: "Could not get account information. User not found", account: {} });
            return;
        }

        const account = { name: findUser.Name, address: findUser.Address, contactNumber: findUser.contactNumber, totalBikesUploaded: findUser.bikeProduct.length };

        res.status(200).json({ message: '', account: account });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", account: {} });
    }
}

async function DeleteAccount(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.user!.userId;

        const findUser = await User.findById(userId);

        if (!findUser) {
            res.status(400).json({ message: "Could not delete account" });
            return;
        }

        if (findUser.bikeProduct.length === 0) {
            await findUser.deleteOne();
            res.clearCookie('RefresToken');
            res.status(200).json({ message: 'Account deleted successfully' });
            return;
        }

        const temp = findUser.bikeProduct;

        await findUser.deleteOne();
        res.clearCookie('RefresToken');
        res.status(200).json({ message: 'Account deleted successfully' });

        for (const x of temp) {
            const findBike = await Bike.findById(x._id);
            await cloudinary.uploader.destroy(findBike!.imagePublicId);
            await findBike?.deleteOne();
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { MyAccount }