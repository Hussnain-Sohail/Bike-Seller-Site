import mongoose from 'mongoose';
const bikeSchema = new mongoose.Schema({
    companyName: String,
    bikeName: String,
    bikePrice: Number,
    bikeModel: Number,
    additioanlInformation: String,
    imagePublicId: String,
    imageURL: String,
    dateUploaded: String,
});
const Bike = mongoose.model('Bike', bikeSchema);
export default Bike;
