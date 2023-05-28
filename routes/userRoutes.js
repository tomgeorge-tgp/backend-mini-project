import express from 'express';
const userRoutes = express.Router();
import{
getUser,
updateUser,
deleteUser,
} from '../controllers/userController.js';
import { verifyToken } from '../verify.js';

userRoutes.get('/:id', getUser);
userRoutes.put('/:id',verifyToken,updateUser);   //first it verifys then when next() is called it updates user 
// userRoutes.post('/login', login);
userRoutes.delete('/:id', verifyToken , deleteUser);


export default userRoutes;
