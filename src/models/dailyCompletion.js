import mongoose from "mongoose";
import TaskModel from "./tasks";

const DailyCompletion = new mongoose.Schema({
    completedAt: {
        type: Date,
        require: true,
        default: Date.now
    },
    tasksCompleted: [TaskModel]
})

const DailyCompletionModel =  (mongoose.models.DailyCompletion || mongoose.model("DailyCompletion", DailyCompletion))

export default DailyCompletionModel;
