import Schedule from "../models/Schedule.js"
import { handleError } from "../error.js";
import User from "../models/User.js";
import Book from "../models/Booking.js"
import {transporter,mailOptions} from "../sendMail.js"

export const schedSession=async(req,res)=>{
    try{
        var {userId,date,start,end} = req.body
       
                
        let session = {
            counsellorid:userId,
            date:date

        };
        
        const sessionDuration = 60 * 60 * 1000; // 1 hour in milliseconds
       
        let currentSessionStart = new Date(start);
        
        const End=new Date(end)
        if (currentSessionStart>End){
            return res.status(409).json("End is less than start Request denied")
        }
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
            
            handleError(409,error)
            console.log("error1")
            return res.status(409).json(saveNewSession+"session is repeated")
            
        }
        currentSessionStart = new Date(currentSessionEnd);
       
        }
        console.log("hi")
        res.status(200).json(req.body)
    }
    catch(err){
        handleError(500,err)
    }

}

export  const getSched=async(req,res)=>{


    try {
        var sched=await Schedule.find({status:"true",date:req.query.date})
       
        res.status(200).json(sched)
        

    } catch (error) {
        handleError(500,error)
    }
}
export  const getScheduledSes=async(req,res)=>{


    try {
        var sched=await Schedule.find({status:"false",date:req.query.date})
       
        res.status(200).json(sched)
        

    } catch (error) {
        handleError(500,error)
    }
}


export  const deleteSchedule=async(req,res)=>{


    try {
    //     var sched=await Schedule.find({_id:req.query._id})
    //    Schedule.deleteOne({_id:sched})
    //     res.status(200).json(sched)
        const schedule = await Schedule.findById(req.query._id);

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    await Schedule.deleteOne({ _id: req.query._id });

    res.status(200).json(schedule);

    } catch (error) {
        handleError(500,error)
    }
}
export const bookSes=async(req,res)=>{
    try {
        let schedule = await Schedule.findById(req.query._id);
        console.log(schedule)
        
        let bookSession={
            counsellorid:schedule.counsellorid,
            userid:req.query.id,
            date:schedule.date,
            start:schedule.start,
            end:schedule.end,
            
        }

        schedule.status=false
        await schedule.save()       
        const saveBookSession=new Book(bookSession)
        const savedBookSession=await saveBookSession.save()
       try{
                mailOptions["subject"]="There is a booking"
                
                let Username=await  User.find({_id:req.query.id})
                
                let Name=Username[0]["fullname"]
                
                let bookDate=bookSession.date;
                
                let DD,MM,YY;
                DD=bookDate.getDate()
                MM=bookDate.getMonth()
                YY=bookDate.getFullYear()
                
            
               
                const formattext=(time)=>{
                    let timeH=time.getHours(),timeM=time.getMinutes()
                    if(parseInt(timeM)<11)
                        timeM='0'+timeM

                    if ((parseInt(timeH)>12))
                        time=`${parseInt(timeH)-12}:${timeM} PM`

                                   
                    else
                        time=`${timeH}:${timeM} AM`
                    
                     return time
                     
                }

                let start=formattext(bookSession.start),end=formattext(bookSession.end);
                
                
             


                mailOptions["text"]=`${Name} has booked a session on ${DD}/${MM}/${YY} from ${start} to ${end}`;       
                

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                    console.error('Error sending email:', error);
                    } else {
                    console.log('Email sent:', info.response,mailOptions);
                    }
                });
                
       }
       catch(err)
       {
        console.log("error test",err)
       }
        
        
        res.status(200).json(savedBookSession)


    }
    catch(error){
        handleError(500,error)
    }
}
