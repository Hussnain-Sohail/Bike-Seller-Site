import express from 'express';
const NewAccessTokenRouter = express.Router();
import NewAccessTokenProvider from '../controller/NewAccessToken.mts';
NewAccessTokenRouter.post('/user/newaccesstoken', NewAccessTokenProvider);
export default NewAccessTokenProvider;