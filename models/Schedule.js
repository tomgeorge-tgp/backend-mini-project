import mongoose from  "mongoose"

const ScheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  times: [{
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
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
