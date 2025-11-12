import mongoose from "mongoose";
const taskSchema = mongoose.Schema({
  note  : {
    type: mongoose.Schema.Types.String,
  },
});
const TaskModel = mongoose.model("notes", taskSchema);
export default TaskModel;
