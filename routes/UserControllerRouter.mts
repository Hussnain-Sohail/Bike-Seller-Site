import Signup from "../controller/Signup.mts";
import Login from '../controller/Login.mts';
import express from 'express';
const UserControllerRouter = express.Router();

UserControllerRouter.post('/user/signup', Signup);
UserControllerRouter.post('/user/login', Login);

export default UserControllerRouter;