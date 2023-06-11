import express from 'express'
const bookingRoutes=express.Router();
import {addBooking,} from '../controllers/bookingControllers.js'

bookingRoutes.post('/',addBooking) //TO schedule a session
// bookingRoutes.get('/:id',getUserSchedule) //TO schedule a session
// bookingRoutes.get('/',getSchedule) //available  sessions

export default bookingRoutes