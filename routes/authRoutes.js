import express from 'express';
const authRoutes = express.Router();

//import { authenticateUser } from '../middleware/authentication.js';

import{
  register,
  login,
  // registerCouncil
//   logout,
//   verifyEmail,
//   forgotPassword,
//   resetPassword,
} from '../controllers/authController.js';

authRoutes.post('/register', register);
authRoutes.post('/login', login);
// authRoutes.post('/registercouncil',registerCouncil)// for registeration of office bearers
//authRoutes.delete('/logout', authenticateUser, logout);


export default authRoutes;
