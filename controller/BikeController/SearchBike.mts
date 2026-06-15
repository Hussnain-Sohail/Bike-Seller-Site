import Bike from '../../model/BikeSchema.mts';
import type { Request, Response } from 'express';

async function SearchBike(req: Request, res: Response): Promise<void> {
    try {
        console.log('request hit ?')
        if (!req.body) {
            res.status(400).json({ message: "Bike name not found" });
            return;
        }

        const { bikeName } = req.body;

        if (!bikeName) {
            res.status(401).json({ message: 'Bike name required', bikes: [] });
            return;
        }

        const company: string | undefined = bikeName.split(' ')[0];
        const name: string | undefined = bikeName.split(' ')[1];

        if (company === undefined || name === undefined) {
            res.status(401).json({ message: 'Please enter valid format eg: (Yamaga R1) etc', bikes: [] });
            return;
        }

        const bikes = await Bike.aggregate([
            {
                $match: {
                    companyName: company,
                    bikeName: name,
                },
            },
            {
                $sample: { size: 10 },
            }
        ]);

        if (bikes.length === 0) {
            res.status(400).json({ message: `No Bikes of name ${bikeName} found`, bikes: [] });
            return;
        }

        console.log('request end ?')
        res.status(200).json({ messsage: 'Bikes found', bikes });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export default SearchBike;