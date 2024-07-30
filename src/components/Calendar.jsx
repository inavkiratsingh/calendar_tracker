'use client'
import React from 'react'
import CalenderHeader from './CalenderHeader'
import Weeks from './Weeks'
import DatesMatrix from './DatesMatrix'

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const generateYearDates = () => {
    const year = new Date().getFullYear();
    const today = new Date();
    const yearCalendar = [];

    for (let month = 0; month < 12; month++) {
        const calendar = [[]];
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);

        // Check if the end of the month should be truncated
        const lastDate = month === today.getMonth() ? today.getDate() : endDate.getDate();

        let week = 0;

        // Add empty slots for days before the start of the month
        for (let i = 0; i < startDate.getDay(); i++) {
            calendar[week].push(null);
        }

        // Fill in the days of the month
        for (let i = 1; i <= lastDate; i++) {
            if (calendar[week].length === 7) {
                week++;
                calendar[week] = [];
            }
            calendar[week].push(i);
        }

        // Add empty slots for days after the end of the month
        while (calendar[week].length < 7) {
            calendar[week].push(null);
        }

        yearCalendar.push(calendar);
    }

    return yearCalendar;
};



// const generateDates = () => {
//     const calender = [[]]
//     const today = new Date()
//     const month = months[today.getMonth()];
//     const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
//     const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

//     let week = 0;

//     for(let i=0; i<startDate.getDay(); i++) {
//         calender[week].push(null)
//     }

//     for(let i=1; i<= endDate.getDate(); i++) {
//         if(calender[week].length == 7) {
//             week++
//             calender[week] = []
//         }
//         calender[week].push(i)
//     }

//     while(calender[week].length < 7) {
//         calender[week].push(null);
//     }

//     return [calender, month];
// }

const Calendar = () => {
    const dates = generateYearDates();
    return (
        // <div className='bg-zinc-900 p-4 rounded-xl shadow-lg w-full'>
        //     {/* <CalenderHeader /> */}
        //     {/* <Weeks /> */}
        //     <DatesMatrix 
        //     dates={dates}
        //     month={month}
        //     />
        // </div>

        <div className='bg-zinc-900 p-4 rounded-xl shadow-lg w-full flex gap-5'>
            {dates.map((dates, index) => (
                <div key={index} className='month-container'>
                    <DatesMatrix dates={dates} monthIndex={index} />
                    <h2 className='text-zinc-400 text-center text-[8px] font-bold mb-1 mt-1'>{months[index]}</h2>
                </div>
            ))}
        </div>
  )
}

export default Calendar