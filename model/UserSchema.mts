import mongoose, { Model } from 'mongoose';
import Bike from './BikeSchema.mts';
interface IUser {
    Name: string,
    Age: number,
    Password: string,
    Tier: string,
    Address: string,
    contactNumber: string,
    accountCreatedAt: string,
    bikeProduct: mongoose.Types.ObjectId[],
};

const userSchema = new mongoose.Schema({
    Name: String,
    Age: Number,
    Password: String,
    Tier: {
        type: String,
        default: 'regular',
    },
    Address: String,
    contactNumber: String,
    accountCreatedAt: String,
    bikeProduct: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Bike'
            }
        ],
        default: [],
    },
});

const User: Model<IUser> = mongoose.models.User as Model<IUser> || mongoose.model('User', userSchema);
export default User;