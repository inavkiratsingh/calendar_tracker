import React from 'react'

const CalenderHeader = () => {


    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

    const weeks = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];


    const today = new Date()

    return (
    <div className='flex justify-between mb-6 text-black'>
            <span>{months[today.getMonth()]}, {today.getFullYear()}</span>
            <span>{weeks[today.getDay()]}</span>
    </div>
  )
}

export default CalenderHeader