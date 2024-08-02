import mongoose from "mongoose";

export const TaskSchema =  new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    createdAt: {
        type : Date,
        require: true,
        default: Date.now
    },
    completedAt: {
        type: Date,
        require: true
    }
})


const TaskModel = (mongoose.models.Tasks || mongoose.model("Tasks", TaskSchema))

export default TaskModel;