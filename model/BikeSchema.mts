import mongoose, { Model } from 'mongoose';
interface IProduct {
    uploaderId: string,
    companyName: string,
    bikeName: string,
    bikePrice: number,
    bikeModel: number,
    additioanlInformation: string,
    imagePublicId: string,
    imageURL: string,
    dateUploaded: string,
};

const bikeSchema = new mongoose.Schema({
    uploaderId: String,
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