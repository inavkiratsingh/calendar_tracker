import dbConnect from "@/lib/dbConnect";
import TaskModel from "@/models/tasks";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await dbConnect();

        const {title, description} = await request.json();
        const task = await TaskModel.findOne({ title });

        if(task) {
            return NextResponse.json({
                success: false,
                message: "Task already exists",
                task: task
            }, {status: 300})
        }

        const newTask = await TaskModel({
            title,
            description
        })

        await newTask.save();



        return NextResponse.json(
            {
                success: true,
                msg: "Task Added",
                task: newTask
            }, {status: 200}
        )
    } catch (error) {
        console.log("error", error);
    }
}