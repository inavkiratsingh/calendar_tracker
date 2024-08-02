import React from 'react'

const DatesMatrix = ({dates,monthIndex}) => {
    // console.log(dates,monthIndex);
  return (
    <>
        <div className='flex'>
            {dates.map((date,indexd) => (
                <div className='flex flex-col gap-[2px]' key={indexd}>
                    {date.map((day, index) => {
                        const formattedMonth = String(monthIndex + 1).padStart(2, '0'); // Ensure two digits
                        const formattedDay = day !== null ? String(day).padStart(2, '0') : '00'; // Ensure two digits
                        const dateStr = day !== null ? `2024-${formattedMonth}-${formattedDay}` : null; // Adjust year if necessary
                        // console.log(dateStr);
                        return (
                        <div className='text-center cursor-pointer mr-[2px]' key={index}>
                            {day === null ? (
                                <div className='w-3 h-3'></div>
                            ) : (
                                <div className='w-3 h-3 bg-zinc-800 rounded-sm'></div>
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