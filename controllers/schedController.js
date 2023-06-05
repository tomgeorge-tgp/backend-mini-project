import Schedule from "../models/Schedule.js"
import { handleError } from "../error.js";
//import User from "../models/User.js";

export const schedSession=async(req,res)=>{
    try{
        var {userId,date,start,end} = req.body
       
                
        let session = {
            userId:userId,
            date:date

        };
        
        const sessionDuration = 60 * 60 * 1000; // 1 hour in milliseconds
       
        let currentSessionStart = new Date(start);
        
        const End=new Date(end)
        
        while (currentSessionStart < End) {
        const currentSessionEnd = new Date(currentSessionStart.getTime() + sessionDuration);
        
        if (currentSessionEnd > End) {
            //currentSessionEnd.setTime(end.getTime());
            break
        }
              

        let newSession=session
        newSession["start"]=currentSessionStart
        newSession["end"]=currentSessionEnd
        console.log(newSession,"new")
        let saveNewSession=new Schedule(newSession)
        try{
        let savedSession=await saveNewSession.save()
        console.log(savedSession)}
        catch(error){
            //console.log(error)
            handleError(500,error)
            res.status(500)
        }
        currentSessionStart = new Date(currentSessionEnd);
       
        }
        res.status(200).json(req.body)
    }
    catch(err){
        handleError(500,err)
    }

}

export  const getSched=async(req,res)=>{


    try {
        var sched=await Schedule.find()
        console.log("testing"+sched)
        res.status(200).json(sched)
        // Schedule.find()
        //     .then((schedules) => {
        //     res.status(200).json(schedules);
        //     })

    } catch (error) {
        handleError(500,error)
    }
}

