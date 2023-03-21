//import UserRoutes from './userRoutes.js'
import AuthRoutes from './authRoutes.js';


export default function(app)
{
   // app.use('/user', UserRoutes);
    app.use('/auth',AuthRoutes);
};