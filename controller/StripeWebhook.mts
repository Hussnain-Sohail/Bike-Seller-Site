import type { Request, Response } from 'express';
import stripe from 'stripe';
import User from '../model/UserSchema.mts';
async function StripeWebhook(req: Request, res: Response) {
    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            req.headers['stripe-signature']!,
            process.env.STRIPE_WEBHOOK_SECRET!,
        );

        if (event.type === 'checkout.session.completed') {
            const userId: string = event.data.object.metadata!.useerId!;

            const findUser = await User.findById(userId);

            findUser!.Tier = 'Pro';

            await findUser!.save();
            res.status(200);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
}
export default StripeWebhook;