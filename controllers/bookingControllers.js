
import Booking from "../models/Booking.js";
import Schedule from "../models/Schedule.js"
import moment from 'moment';
// import "../api/googleCalanderTest.js"
export const addBooking = async (req, res) => {
    // const scheduleData = req.body.schedule;
    console.log("req data",req.body);
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
        console.log("schedule",schedule);
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
        console.log()
        const momentTime1 = moment(req.body.to, 'h:mm:ss a');
         const momentTime2 = moment(schedule.times[1], 'h:mm a');
         if (momentTime1.isSame(momentTime2)) {
            console.log('The times are the same.');
            try{
            const updatedSchedule = await Schedule.findOneAndUpdate(
                { _id: scheduleId },
                { $pull: { times: { _id: scheduleTimeId } } },
                { new: true }
              );
              console.log('Updated Schedule:', updatedSchedule);
         } catch (error) {
              console.error('Error deleting time:', error);
        }
           

          } else {
            console.log('The times are different.');
            try {
                const updatedSchedule = await Schedule.findOneAndUpdate(
                  { _id: scheduleId, 'times._id': scheduleTimeId },
                  {    $set: {
                    'times.$.from': booking.to,
                    'times.$.to': schedule.times[1],
                  }, },
                  { new: true }
                );
            
                console.log('Updated Schedule:', updatedSchedule);
              } catch (error) {
                console.error('Error updating time from:', error);
              }

          }

      res.status(200).json({ message: 'Booking saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving schedule' });
    }
  };