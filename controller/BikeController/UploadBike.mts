import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'
import type { UploadApiResponse } from 'cloudinary';
import type { Request, Response } from 'express';
import User from '../../model/UserSchema.mts';
import Bike from '../../model/BikeSchema.mts';
import type { Types } from 'mongoose';
import { z } from 'zod';

dotenv.config({ path: '/server/.env' });
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.CLOUD_API_KEY!,
    api_secret: process.env.CLOUD_API_SECRET!,
});

const bikeData = z.object({
    companyName: z.string(),
    bikeName: z.string(),
    bikePrice: z.number().min(0),
    bikeModel: z.number().min(1950),
    additionalInformation: z.string().optional(),
    imageURL: z.string(),
});
async function UploadBike(req: Request, res: Response): Promise<void> {
    try {

        const validData = bikeData.safeParse(req.body);

        if (!validData.success) {
            res.status(400).json({ message: validData.error.issues[0]?.message ?? "Invalid data entered" });
            return;
        }
        const userId: string = req.user!.userId;

        const findUser = await User.findById(userId);
        if (!findUser) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        const uploaded: UploadApiResponse = await cloudinary.uploader.upload(validData.data.imageURL);

        const newBike = new Bike({
            uploaderId: findUser._id,
            companyName: validData.data.companyName,
            bikeName: validData.data.bikeName,
            bikePrice: validData.data.bikePrice,
            bikeModel: validData.data.bikeModel,
            additionalInformation: validData.data.additionalInformation,
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