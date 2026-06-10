import mongoose, { Model } from 'mongoose';
interface IProduct {
    companyName: String,
    bikeName: String,
    bikePrice: Number,
    bikeModel: Number,
    additioanlInformation: String,
    imagePublicId: String,
    imageURL: String,
    dateUploaded: String,
};

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

const Bike: Model<IProduct> = mongoose.models.Bike as Model<IProduct> || mongoose.model('Bike', bikeSchema);

export default Bike