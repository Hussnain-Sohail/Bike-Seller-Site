import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import dotenv from 'dotenv';
import type { Request, Response } from 'express';
dotenv.config();
import User from '../model/UserSchema.mjs';
import Bike from '../model/ProductSchema.mjs';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_SECRET,
    api_secret: process.env.CLOUD_API_SECRET,
});
async function UploadBike(req: Request, res: Response): Promise<void> {
    try {
        if (!req.body) {
            res.status(400).json({ message: 'Something went wrong' });
            return;
        } else if (!req.user!.userId) {
            res.status(400).json({ message: 'Someething went wrong user not found' });
            return;
        }
        const userId: string = req.user!.userId;

        const { companyName, bikeName, bikePrice, bikeModel, additioanlInformation, imageURL } = req.body;
        if (!companyName || !bikeName || !bikePrice || !bikeModel || !imageURL) {
            res.status(400).json({ message: "All fields are required for uloading bike" });
            return;
        } else if (bikePrice <= 0) {
            res.status(400).json({ message: "Enter valid bike price" });
            return;
        }

        const findUser = await User.findById(userId);
        if (!findUser) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        const uploaded: UploadApiResponse = await cloudinary.uploader.upload(imageURL);

        const newBike = new Bike({
            companyName: companyName,
            bikeName: bikeName,
            bikePrice: bikePrice,
            bikeModel: bikeModel,
            additioanlInformation: additioanlInformation,
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