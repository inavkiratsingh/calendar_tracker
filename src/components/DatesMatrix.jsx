'use client'
import axios from 'axios'
import React, { useState } from 'react'

const DatesMatrix = ({dates,monthIndex,tasks,load}) => {
    // console.log(dates,monthIndex,tasks);
    // console.log(tasks['8/3/2024']);


    

    return (
        <>
            <div className='flex'>
                {dates.map((date,indexd) => (
                    <div className='flex flex-col gap-[2px]' key={indexd}>
                        {date.map((day,index) => {
                            const formattedMonth = String(monthIndex + 1); // Ensure two digits
                            const formattedDay = day !== null ? String(day): '0'; // Ensure two digits
                            const dateStr = day !== null ? `${formattedMonth}/${formattedDay}/2024` : null; // Adjust year if necessary
                            // console.log("ds",dateStr);

                            if(dateStr !== null) {
                                
                                if(tasks[dateStr] === 1){
                                    setColor('bg-green-950')
                                } else if(tasks[dateStr] === 2) {
                                    setColor('bg-green-900')
                                } else if (tasks[dateStr] === 3) {
                                    setColor('bg-green-500')
                                }
                            }
                            return (
                            <div className='text-center cursor-pointer mr-[2px]' key={index}>
                                {day === null ? (
                                    <div className='w-3 h-3'></div>
                                ) : (
                                    <div className={`w-3 h-3 ${tasks[dateStr] ? tasks[dateStr][1] : 'bg-zinc-800'} rounded-sm`}></div>
                                )}
                            </div>
                        )})}
                    </div>
                ))}
            </div>
            {/* <div className='text-[8px]'>{month}</div> */}
        </>
    )
}

export default DatesMatrix
