import express from 'express'
const schedRoutes=express.Router();
import {schedSession,getSched} from '../controllers/schedController.js'

schedRoutes.post('/schedule',schedSession)
schedRoutes.get('/book',getSched)
export default schedRoutes