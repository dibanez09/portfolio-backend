import { Router } from 'express';
const router = Router();

import authRouter from './auth'
import userRouter from './users'

router.use('/auth', authRouter);
router.use('/users', userRouter);


export default router;
