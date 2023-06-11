import mongoose from  "mongoose"

const ScheduleSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true
  },
  times: [{
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});



export default mongoose.model('Schedule',ScheduleSchema);
