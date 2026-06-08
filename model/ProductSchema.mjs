import mongoose from 'mongoose';
const bikeSchema = new mongoose.Schema({
    companyName: String,
    bikeName: String,
    bikePrice: Number,
    bikeModel: Number,
    bikeCondition: String,
    additioanlInformation: String,
    imageURL: String,
});
const Bike = mongoose.model('Bike', bikeSchema);
export default Bike;
