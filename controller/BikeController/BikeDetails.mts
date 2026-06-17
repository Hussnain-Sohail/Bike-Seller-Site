import type { Request, Response } from 'express';
import Bike from '../../model/BikeSchema.mts';
import User from '../../model/UserSchema.mts';

async function BikeAndUploaderDetails(req: Request, res: Response): Promise<void> {
    try {
        const { bikeId } = req.body;

        const findBike = await Bike.findById(bikeId);

        if (!findBike) {
            res.status(400).json({ message: "Could not find bike" });
            return;
        }

        const findUser = await User.findById(findBike.uploaderId);

        if (!findUser) {
            res.status(400).json({ message: "Could not uploader information!", dataObject: { bike: findBike, uploader: {} } });
            return;
        }

        res.status(200).json({ message: "", dataObject: { bike: findBike, uploader: findUser } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default BikeAndUploaderDetails;