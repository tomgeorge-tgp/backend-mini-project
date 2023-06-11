import Schedule from "../models/Schedule.js"
import { handleError } from "../error.js";
import User from "../models/User.js";
import Book from "../models/Booking.js"


export const addSchedule = async (req, res) => {
  const scheduleData = req.body.schedule;
  const userId = req.body.userId;
console.log("scheduleData",scheduleData);
  try {
    Object.keys(scheduleData).forEach(async (date) => {
      Schedule.findOneAndUpdate(
        { userId, date },
        { times: scheduleData[date] },
        { upsert: true, new: true }
      )
        .then((schedule) => {
          console.log('Schedule saved:', schedule);
        })
        .catch((err) => console.error(err));
    });

    res.status(200).json({ message: 'Schedule saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving schedule' });
  }
};
export const getUserSchedule = async (req, res) => {
    // const scheduleData = req.body.sche;
    const userId = req.params.id;
     console.log("user",userId);
    try {
        const schedule = await Schedule.find({userId:req.params.id}).sort({
            createAt:-1,
        }); 
        // console.log("schedule",schedule);
        res.status(200).json(schedule); 
    } catch (error) {
      
    }
  };
  export const getSchedule = async (req, res) => {
    // console.log("here");
    try {
      const schedule = await Schedule.find().sort({ date: 1, 'times.start': 1 });
      res.status(200).json(schedule);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching schedule data' });
    }
  };
  






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
        console.log("test")
        let bookSession={
            counsellorid:schedule.counsellorid,
            userid:req.query.id,
            date:schedule.date,
            start:schedule.start,
            end:schedule.end,
            
        }

        schedule.status=false
        await schedule.save()
        console.log("update")
        // bookSession["userid"]=req.query.id
        console.log(bookSession)
        const saveBookSession=new Book(bookSession)
        const savedBookSession=await saveBookSession.save()
        
        
        res.status(200).json(savedBookSession)


    }
    catch(error){
        handleError(500,error)
    }
}
