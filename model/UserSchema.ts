import mongoose from 'mongoose';
import Bike from './ProductSchema.ts';
const userSchema = new mongoose.Schema({
    Name: String,
    Age: Number,
    Password: String,
    Address: String,
    contactNumber: String,
    bikeProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike'
    },
});

const User = mongoose.model('User', userSchema);
export default User;