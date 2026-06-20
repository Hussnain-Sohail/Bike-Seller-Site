import express from 'express';
import ServerSecurity from '../middleware/ServerSecurity.mts';
import UploadBike from '../controller/BikeController/UploadBike.mts'
import SearchBike from '../controller/BikeController/SearchBike.mts';
import SeeUploadedBikes from '../controller/BikeController/SeeUploadedBikes.mts';
import BikeAndUploaderDetails from '../controller/BikeController/BikeDetails.mts';

const BikeControllerRouter = express.Router();
BikeControllerRouter.post('/user/uploadbike', ServerSecurity, UploadBike);
BikeControllerRouter.post('/user/searchbike', ServerSecurity, SearchBike);
BikeControllerRouter.post('/user/see/uploadedbikes', ServerSecurity, SeeUploadedBikes);
BikeControllerRouter.post('/user/bikedetails', ServerSecurity, BikeAndUploaderDetails);
export default BikeControllerRouter; 