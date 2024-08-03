import DailyCompletionModel from "@/models/dailyCompletion";
import { NextResponse } from "next/server";

const { default: dbConnect } = require("@/lib/dbConnect");


export async function POST(request) {

    try {
        await dbConnect();
        
        // const { date } = await request.json();
        // console.log(date);

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        // console.log(year, month);
        

        const taskForDate = await DailyCompletionModel.find({});

        if(!taskForDate) {
            return NextResponse.json({
                success: true,
                tasks: 0
            }, {status: 200})
        }

        const tasksObj = {}
        taskForDate.forEach(task => {
            tasksObj[task.completedAt] = [task.tasksCompleted.length, task.tasksCompleted.length === 1 ? 'bg-green-950' : (task.tasksCompleted.length === 2 ? 'bg-green-800' : (task.tasksCompleted.length >= 3 ? 'bg-green-600' : 'bg-zinc-800'))];
        });
        
        
        
        
        return NextResponse.json({
            success: true,
            tasks: tasksObj
        }, {status: 200})
        
    } catch (error) {
        console.log("error in get tasks",error);
        
    }
}