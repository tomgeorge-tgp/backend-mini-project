import express from 'express'
const schedRoutes=express.Router();
import {schedSession,getSched, getScheduledSes,deleteSchedule,bookSes} from '../controllers/schedController.js'

schedRoutes.post('/schedule',schedSession) //TO schedule a session
schedRoutes.get('/tobook',getSched) //available  sessions
schedRoutes.get('/booked',getScheduledSes)//booked seesions
schedRoutes.delete('/:_id',deleteSchedule)
schedRoutes.post('/booking/:_id/:id',bookSes)
export default schedRoutes