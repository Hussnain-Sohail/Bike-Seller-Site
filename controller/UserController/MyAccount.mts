import type { Request, Response } from 'express';
import User from '../../model/UserSchema.mts';
async function MyAccount(req: Request, res: Response): Promise<void> {
    try {
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
export default MyAccount;