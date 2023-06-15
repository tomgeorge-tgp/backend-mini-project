
import Booking from "../models/Booking.js";
import Schedule from "../models/Schedule.js"
import User from "../models/Schedule.js"
import moment from 'moment';
// import "../api/googleCalanderTest.js"


export const addBooking = async (req, res) => {
    // const scheduleData = req.body.schedule;
    // console.log("req data",req.body);
    const userId = req.body.userId;
    const scheduleId=req.body._scheduleId;
    const scheduleTimeId=req.body._scheduleTimeId

    try {
        const schedule = await Schedule.findOne({
            _id: scheduleId,
            'times._id':scheduleTimeId
          });
      
          if (!schedule) {
            console.log('Schedule not found');
            return;
        }
        // console.log("schedule",schedule);
        const booking={
            userId:userId,
            counsellorId:schedule.userId,
            date:req.body.date,
            from:req.body.from,
            to:req.body.to,    
        }
        let newBooking =new Booking(booking);
        const savedBooking = await newBooking.save();
 
        // const schedule = await Schedule.findById(scheduleId);
        
        // if (!schedule) {
        //   return res.status(404).json({ error: 'Schedule not found' });
        // }
        // console.log("schedule.time",schedule.times[0]);
        const BookingTimeFrom= moment(req.body.from, 'h:mm:ss a');
        const BookingTimeTo= moment(req.body.to, 'h:mm:ss a');
        const ScheduleTimeFrom = moment(schedule.times[0].from, 'h:mm a');
         const SchdeuleTimeTo = moment(schedule.times[0].to, 'h:mm a');

         // if both time are equal to delete that date from database
        if(BookingTimeFrom.isSame(ScheduleTimeFrom) && BookingTimeTo.isSame(SchdeuleTimeTo)){
            try{

             
                const deletedSchedule = await Schedule.findOneAndDelete({ _id: scheduleId });
                // Handle the result of the operation
                return res.status(200).json({ message: 'Booking saved successfully' });
           
            }
            catch(err)
            {
                console.log("Error",err);
            }
    }

        else if (BookingTimeFrom.isSame(ScheduleTimeFrom)) {
            console.log('Same From time');
        
            try{
               
                const updatedSchedule = await Schedule.findOneAndUpdate(
                    { _id: scheduleId, 'times._id': scheduleTimeId },
                    {    $set: {
                      'times.$.from': req.body.to,
                      'times.$.to': schedule.times[0].to,
                    }, },
                    { new: true }
                  );
            // const updatedSchedule = await Schedule.findOneAndUpdate(
            //     { _id: scheduleId },
            //     { $pull: { times: { _id: scheduleTimeId } } },
            //     { new: true }
            //   );
            //   2console.log('Updated Schedule:', updatedSchedule);
             return res.status(200).json({ message: 'Booking saved successfully' });
         } catch (error) {
              console.error('Error deleting time:', error);
        }
    }
        else if (BookingTimeTo.isSame(SchdeuleTimeTo)) {
            console.log('Same To time');
        
            try{
               
                const updatedSchedule = await Schedule.findOneAndUpdate(
                    { _id: scheduleId, 'times._id': scheduleTimeId },
                    {    $set: {
                      'times.$.from': schedule.times[0].from,
                      'times.$.to': req.body.from,
                    }, },
                    { new: true }
                  );
             return res.status(200).json({ message: 'Booking saved successfully' });
         } catch (error) {
              console.error('Error deleting time:', error);
        }   
    }
           else {
            console.log('The times are middle.');
            try {
                // Query 1: Pulling the time slot
  const updatedSchedule = await Schedule.findOneAndUpdate(
    { _id: scheduleId },
    { $pull: { times: { _id: scheduleTimeId } } },
    { new: true }
  );

  // Query 2: Pushing the new time slots
  const updatedTimes = [
    { from: schedule.times[0].from, to: req.body.from },
    { from: req.body.to, to: schedule.times[0].to }
  ];

  const updatedScheduleFinal = await Schedule.findOneAndUpdate(
    { _id: scheduleId },
    { $push: { times: { $each: updatedTimes } } },
    { new: true }
  );

  console.log('Updated schedule:', updatedScheduleFinal);
  return res.status(200).json({ message: 'Booking saved successfully' });

                
                
              } catch (error) {
                console.error('Error updating time from:', error);
              }

          }

      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error saving schedule' });
    }
  };

  export  const getCounsilorBooking=async(req,res)=>{
//  console.log("req.parmas",req.params.id);

    try {
        var booking=await Booking.find({userId:req.params.id})
       
        res.status(200).json(booking)
        

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error saving schedule' });
    }
}
export const deleteBooking = async(req,res,next)=>{
  console.log("delete",req.params);
    // console.log(req.query);
      try{
          const booking = await Booking.findById(req.params.id);
               await booking.deleteOne();
               res.status(200).json("booking has been deleted");
        
      }
      catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Error deleting booking' });
      }
  }