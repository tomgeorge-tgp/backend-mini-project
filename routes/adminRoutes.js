import express from 'express';
const adminRoutes = express.Router();
import{
login,register,allUser,deleteUser
} from '../controllers/adminController.js';
// import { verifyToken } from '../verify.js';

adminRoutes.post('/', login);//login for admin
// userRoutes.put('/:id',verifyToken,updateUser);   first it verifys then when next() is called it updates user 
adminRoutes.post('/register', register);//to register other core members
adminRoutes.get('/:id',allUser);   //to get all users of a particular type
// userRoutes.post('/login', login);
adminRoutes.delete('/:id', deleteUser);


export default userRoutes;
