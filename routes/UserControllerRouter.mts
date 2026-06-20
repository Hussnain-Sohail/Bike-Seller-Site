import Signup from "../controller/UserController/Signup.mts";
import Login from '../controller/UserController/Login.mts';
import Logout from "../controller/UserController/Logout.mts";
import express from 'express';
import ServerSecurity from "../middleware/ServerSecurity.mts";
import MyAccount from '../controller/UserController/MyAccount.mts';
import ChangeUserName from "../controller/UserController/ChangeUserName.mts";
import DeleteAccount from "../controller/UserController/DeleteAccount.mts";
import UpdateAccountTier from "../controller/UserController/UpdateAccountTier.mts";
const UserControllerRouter = express.Router();

UserControllerRouter.post('/user/signup', Signup);
UserControllerRouter.post('/user/login', Login);
UserControllerRouter.get('/user/logout', ServerSecurity, Logout);
UserControllerRouter.delete('/user/deleteaccount', ServerSecurity, DeleteAccount);
UserControllerRouter.post('/user/myaccount', ServerSecurity, MyAccount)
UserControllerRouter.post('/user/changeusername', ServerSecurity, ChangeUserName);
UserControllerRouter.post('/user/updatetier', ServerSecurity, UpdateAccountTier);

export default UserControllerRouter;