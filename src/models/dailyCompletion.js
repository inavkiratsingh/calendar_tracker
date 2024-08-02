import mongoose from "mongoose";
import { TaskSchema } from "./tasks";

const DailyCompletion = new mongoose.Schema({
    completedAt: {
        type: String,
        require: true
    },
    tasksCompleted: [TaskSchema]
})

const DailyCompletionModel =  (mongoose.models.DailyCompletion || mongoose.model("DailyCompletion", DailyCompletion))

export default DailyCompletionModel;
