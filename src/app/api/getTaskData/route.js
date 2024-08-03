import dbConnect from "@/lib/dbConnect";
import TaskModel from "@/models/tasks";
import { NextResponse } from "next/server";


export async function POST(request) {

    try {
        await dbConnect();

        const task = await TaskModel.find({})
        
        if(task.length === 0) {
            return NextResponse.json({
                success: false,
                message: "No task yet"
            }, {status: 300})
        }

        return NextResponse.json({
            success: true,
            message: task
        }, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "internal error in fetching the tasks"
        }, {status: 500})
    }
}