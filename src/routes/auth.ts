import { Router } from 'express';
import { signIn, signOut } from '../controller/authController';

const authRouter = Router();

authRouter.post('/signin', signIn);
authRouter.post('/signout', signOut)

export default authRouter;