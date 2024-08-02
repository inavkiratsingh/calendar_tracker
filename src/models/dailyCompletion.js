import mongoose from "mongoose";
import { TaskSchema } from "./tasks";

const DailyCompletion = new mongoose.Schema({
    completedAt: {
        type: String,
        require: true
    },
    tasksCompleted: []
})

const DailyCompletionModel =  (mongoose.models.DailyCompletion || mongoose.model("DailyCompletion", DailyCompletion))

export default DailyCompletionModel;
