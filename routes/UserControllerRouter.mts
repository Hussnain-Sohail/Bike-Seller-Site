import Signup from "../controller/UserController/Signup.mjs";
import Login from '../controller/UserController/Login.mts';
import express from 'express';
const UserControllerRouter = express.Router();

UserControllerRouter.post('/user/signup', Signup);
UserControllerRouter.post('/user/login', Login);

export default UserControllerRouter;