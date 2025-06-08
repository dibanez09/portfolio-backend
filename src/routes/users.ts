import { Router } from 'express';
import { addUser, getAllUsers, getUser, deleteUser, updateUser } from '../controller/userController';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.post('/add', addUser);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;