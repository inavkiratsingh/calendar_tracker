'use client'
import React, { useEffect, useState } from 'react'
import CalenderHeader from './CalenderHeader'
import Weeks from './Weeks'
import DatesMatrix from './DatesMatrix'
import axios from 'axios'

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

        // Determine the last date to fill in for the current month
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

        // Stop filling months if the current month is reached
        if (month === today.getMonth()) {
            break;
        }
    }

    return yearCalendar;
};




const Calendar = ({ tasks }) => {

    
    
    
    
    // console.log(tasks);
    

    const dates = generateYearDates();
    return (

        <div className='bg-zinc-900 p-4 rounded-xl shadow-lg flex gap-5 items-end justify-end'>
            {dates.map((dates, index) => (
                <div key={index} className='month-container'>
                    <DatesMatrix dates={dates} monthIndex={index} tasks={tasks}/>
                    <h2 className='text-zinc-400 text-center text-sm font-bold mb-1 mt-1'>{months[index]}</h2>
                </div>
            ))}
        </div>
  )
}

export default Calendar