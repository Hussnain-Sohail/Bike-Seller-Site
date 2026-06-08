import mongoose from 'mongoose';
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
const User = mongoose.model('User', userSchema);
export default User;
