'use client'
import Calendar from "@/components/Calendar";
import Tasks from "@/components/Tasks";
import { Plus, UserCheck } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import AddTaskForm from "@/components/AddTaskForm";



export default function Home() {

  const [tasks, settasks] = useState({})
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchTask = async (date) => {
        try {
            const result = await axios.post('/api/get_tasks', { date });
            settasks(result.data.tasks);
        } catch (error) {
            console.log(error);
        }
        
    }

    fetchTask(new Date())
  }, [])

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // console.log(tasks);
  
  
  return (
    <div className="bg-black w-full overflow-y-hidden min-h-screen flex flex-col items-center">

      <div className="w-screen flex p-14 justify-end">
        <Calendar tasks={tasks}/>
      </div>
      <div className="w-[400px]">
        <div className='flex justify-between py-5 px-5'>
          <div className='w-14 h-14 bg-zinc-600 rounded-full text-zinc-200 flex items-center justify-center'>
            <UserCheck />
          </div>
          
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger>
                <div className="w-14 h-14 bg-zinc-600 rounded-full text-zinc-200 flex items-center justify-center">
                  <Plus
                    className='cursor-pointer text-white'
                    size={30}
                    />
                </div>
              </DrawerTrigger>
              <DrawerContent className="bg-zinc-900 border-zinc-700 flex justify-center items-center">
                <div className="w-[600px]">
                  <DrawerHeader>
                    <DrawerTitle className='text-white text-3xl'>Add new Tasks </DrawerTitle>
                    <DrawerDescription>Add your task title and description here ...</DrawerDescription>
                    <AddTaskForm 
                    closeDrawer={closeDrawer}
                    />
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>

        </div>
        <ul>
          <Tasks
          tasks={tasks}
          />
        </ul>
      </div>
    </div>
  );
}
