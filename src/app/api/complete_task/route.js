import dbConnect from "@/lib/dbConnect";
import DailyCompletionModel from "@/models/dailyCompletion";
import TaskModel from "@/models/tasks";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await dbConnect();

        const { taskId } = await request.json();
        // console.log(taskId,completed);
        
        const today = new Date();
        try {
        const task = await TaskModel.findOneAndUpdate(
            { _id: taskId },
            { completedAt: today },
            { new: true }
        )
        await task.save();
        // console.log(task);

        }catch(error) {
            return NextResponse.json({
                success: false,
                message: "Task not found."
            }, {status: 403})
        }

        const todayUpdation = await DailyCompletionModel.findOne({
            completedAt: `${new Date().toLocaleString().split(',')[0]}`
        });

        if(todayUpdation) {
            console.log('in');
            
            const completedOrNot = todayUpdation.tasksCompleted.indexOf(taskId)
            console.log(completedOrNot);
            

            if(completedOrNot !== -1) {
                return NextResponse.json({
                    success: false,
                    message: "Task already completed"
                }, {status: 300})
            }


            const addTask = await DailyCompletionModel.findByIdAndUpdate(
                todayUpdation._id,
                { $push: { tasksCompleted: taskId } },
                { new: true, useFindAndModify: false } // `new: true` returns the updated document
            );

            await addTask.save();
            return NextResponse.json({
                success: true,
                message: "Task completed."
            }, {status: 200})
        }



        const dailyCompletion = await DailyCompletionModel({
            tasksCompleted: taskId,
            completedAt: `${new Date().toLocaleString().split(',')[0]}`
        })

        await dailyCompletion.save();
        // console.log(dailyCompletion);
        

        return NextResponse.json({
            success: true,
            message: "Task completed."
        }, {status: 200})

    } catch (error) {
        console.log("error in complete_task.js",error);
        
    }
}