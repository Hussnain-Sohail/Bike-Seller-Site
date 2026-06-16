import express from 'express';
import ServerSecurity from '../middleware/ServerSecurity.mts';
import UploadBike from '../controller/BikeController/UploadBike.mts'
import SearchBike from '../controller/BikeController/SearchBike.mts';
import SeeUploadedBikes from '../controller/BikeController/SeeUploadedBikes.mts';

const BikeControllerRouter = express.Router();
BikeControllerRouter.post('/user/uploadbike', UploadBike);
BikeControllerRouter.post('/user/searchbike', SearchBike);
BikeControllerRouter.post('/user/see/uploadedbikes', ServerSecurity, SeeUploadedBikes);
export default BikeControllerRouter; 