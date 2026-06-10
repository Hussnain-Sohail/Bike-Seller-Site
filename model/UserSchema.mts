import mongoose, { Model } from 'mongoose';
import Bike from './ProductSchema.mjs';
interface IUser {
    Name: string,
    Age: number,
    Password: string,
    Address: string,
    contactNumber: string,
    bikeProduct: mongoose.Types.ObjectId[],
};

const userSchema = new mongoose.Schema({
    Name: String,
    Age: Number,
    Password: String,
    Address: String,
    contactNumber: String,
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