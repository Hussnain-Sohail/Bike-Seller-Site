import type { Request, Response } from 'express';
import User from '../../model/UserSchema.mts';
import dotenv from 'dotenv';
dotenv.config();
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
async function UpdateAccountTier(req: Request, res: Response) {
    try {
        const userId = req.user!.userId;

        const findUser = await User.findById(userId);
        if (!findUser) {
            res.status(403).json({ message: 'User not found' });
            return;
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'pkr',
                    product_data: {
                        name: 'Update to Pro',
                    },
                    unit_amount: 1000 * 1000,
                },
                quantity: 1,
            }],
            metadata: {
                userId: findUser._id.toString(),
            },
            success_url: process.env.SUCCESS_URL!,
            cancel_url: process.env.SUCCESS_URL!,
        });

        res.status(200).json({ stripeURL: session.url });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default UpdateAccountTier;