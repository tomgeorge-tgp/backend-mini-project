//import UserRoutes from './userRoutes.js'
import AuthRoutes from './authRoutes.js';
import UserRoutes from './userRoutes.js';
import PostRoutes from './postRouter.js';
import SchedRoutes from './schedRoutes.js';
import BookingRoutes from './bookingRoutes.js';
export default function(app)
{
    app.use('/auth',AuthRoutes);
    app.use('/user', UserRoutes);
    app.use('/post', PostRoutes);
    app.use('/schedule',SchedRoutes)
    app.use('/booking',BookingRoutes)
};