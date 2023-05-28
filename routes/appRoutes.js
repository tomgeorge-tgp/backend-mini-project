//import UserRoutes from './userRoutes.js'
import AuthRoutes from './authRoutes.js';
import UserRoutes from './userRoutes.js';
import PostRoutes from './postRouter.js';
export default function(app)
{
    app.use('/auth',AuthRoutes);
    app.use('/user', UserRoutes);
    app.use('/post', PostRoutes);
};