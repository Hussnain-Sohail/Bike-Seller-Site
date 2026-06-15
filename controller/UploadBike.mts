import { v2 as cloudinary } from 'cloudinary'
import type { UploadApiResponse } from 'cloudinary';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';
dotenv.config();
import User from '../model/UserSchema.mts';
import Bike from '../model/BikeSchema.mts';
import type { Types } from 'mongoose';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.CLOUD_API_KEY!,
    api_secret: process.env.CLOUD_API_SECRET!,
});

interface bikeData {
    companyName: string,
    bikeName: string,
    bikePrice: number,
    bikeModel: string,
    additionalInformation: string | undefined,
    imageURL: string,
};
async function UploadBike(req: Request, res: Response): Promise<void> {
    try {
        console.log('request hit ?')
        if (!req.body) {
            res.status(400).json({ message: 'Something went wrong' });
            return;
        } else if (!req.user!.userId) {
            res.status(400).json({ message: 'Someething went wrong user not found' });
            return;
        }
        const userId: string = req.user!.userId;

        const bike = req.body as bikeData;
        if (!bike.companyName || !bike.bikeName || !bike.bikePrice || !bike.bikeModel || !bike.imageURL) {
            res.status(400).json({ message: "All fields are required for uloading bike" });
            return;
        } else if (bike.bikePrice <= 0) {
            res.status(400).json({ message: "Enter valid bike price" });
            return;
        }

        const findUser = await User.findById(userId);
        if (!findUser) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        const uploaded: UploadApiResponse = await cloudinary.uploader.upload(bike.imageURL);

        const newBike = new Bike({
            companyName: bike.companyName,
            bikeName: bike.bikeName,
            bikePrice: bike.bikePrice,
            bikeModel: bike.bikeModel,
            additionalInformation: bike.additionalInformation,
            imagePublicId: uploaded.public_id,
            imageURL: uploaded.secure_url,
            dateUploaded: new Date().toISOString(),
        });

        await newBike.save();

        findUser.bikeProduct.push(newBike._id);
        await findUser.save();

        res.status(200).json({ message: 'Bike uploaded successfully' });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not upload bike' });
    }
}

export default UploadBike;