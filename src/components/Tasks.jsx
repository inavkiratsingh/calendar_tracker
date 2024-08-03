import React, { useEffect, useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { Trash2 } from 'lucide-react'
import axios from 'axios'


const Tasks = ({tasks}) => {
    
    const [task, setTask] = useState([])

    const getTasks = async() => {
        try {
            const result = await axios.post('/api/getTaskData');
            setTask(result.data.message)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        getTasks();
    }, [])

    const completeTask = async(taskId) => {
        try {
            const complete = await axios.post('/api/complete_task', { taskId, completed:false })
        } catch (error) {
            console.log(error);            
        }
    }
    
    return (

        task.map((task, i) => {
            return <li className='border-[1px] border-zinc-700 rounded-2xl h-full p-5 mb-5' key={i}>
            <div className=''>
                <div className="flex items-center space-x-2">
                <Checkbox 
                id="terms" 
                className='border-zinc-700'
                onClick={() => completeTask(task._id)}
                />
                <label
                    htmlFor="terms"
                    className="font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg"
                >
                    {task.title}
                    <span className='text-zinc-500 font-normal text-sm ml-2'>
                    ({new Date(task.createdAt).toLocaleDateString()})
                    </span>
                </label>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <p className='ml-6 mt-2 text-lg font-medium text-zinc-600 w-3/4'>{task.description}</p>
                <div className='text-zinc-600 flex gap-5'>
    
    
                <Trash2 
                className='cursor-pointer'
                size={20}
                // onClick={() => deletehandler(t._id)}
                />
                </div>
            </div>
        </li>
        })
        
    )
}

export default Tasks