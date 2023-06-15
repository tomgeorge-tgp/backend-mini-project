import express from 'express'
const bookingRoutes=express.Router();
import {addBooking,getCounsilorBooking,deleteBooking} from '../controllers/bookingControllers.js'

bookingRoutes.post('/',addBooking) //TO schedule a session
bookingRoutes.get('/:id',getCounsilorBooking) //TO schedule a session
bookingRoutes.delete('/:id',deleteBooking) //available  sessions

export default bookingRoutes