import express from 'express'
const schedRoutes=express.Router();
import {addSchedule,getUserSchedule,getSchedule, getScheduledSes,deleteSchedule,bookSes} from '../controllers/schedController.js'

schedRoutes.post('/',addSchedule) //TO schedule a session
schedRoutes.get('/:id',getUserSchedule) //TO schedule a session
schedRoutes.get('/',getSchedule) //available  sessions
schedRoutes.get('/booked',getScheduledSes)//booked seesions
schedRoutes.delete('/:_id',deleteSchedule)
schedRoutes.post('/booking',bookSes);
export default schedRoutes