"use client"
import React, { useState, useEffect } from 'react'
import { FiCalendar, FiChevronsRight, FiClock, FiSearch } from 'react-icons/fi'
import { useStateContext } from '@/contexts/ContextProvider'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { LuCalendarClock } from 'react-icons/lu'

const Header = ({ page, item }: { page: any; item: any }) => {

    const { currentColor } = useStateContext()

    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const day = currentDate.getDay();
    const hour = currentDate.getHours();
    const hour12 = currentDate.getHours() % 12 || 12;
    const minute = currentDate.getMinutes();
    const [second, setSecond] = useState(currentDate.getSeconds());

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    useEffect(() => {
        const interval = setInterval(() => {
            setSecond(new Date().getSeconds());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className='mb-5 p-5 pt-0 rounded-2xl relative'>
            <form>
                <div className="flex gap-1 items-center border border-gray-400 rounded-2xl px-2 mb-4 -ml-1 sm:w-96">
                    <div className='w-full flex items-center gap-2'>
                        <button type='button' className={`p-2 hover:scale-125 transition text-2xl`}>
                            <HiOutlineLightBulb className={`text-[${currentColor}]`} />
                        </button>
                        <input type='text' placeholder='Search Topic' className='w-full bg-transparent rounded-xl p-1 focus:outline-none' />
                    </div>
                    <button type='button' className='p-2 hover:scale-125 transition text-xl'>
                        <FiSearch />
                    </button>
                </div>
            </form>

            <div className="flex gap-3 items-center">
                <h3 className='text-2xl sm:text-3xl font-bold'>{page}</h3>
                <FiChevronsRight size={24} />
                <h3 className='text-xl'>{item}</h3>
            </div>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xl">
                    <FiCalendar />
                    <h3 className='font-bold'>{days[day]} -</h3>
                    <h3>{date}</h3>
                    <h3>{months[month]}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <FiClock className='mt-[2px] text-xl' />
                    <h3 className='text-md md:text-2xl font-bold'>{hour12} : {minute}</h3>
                    <h3 className='font-bold'>{hour >= 12 ? "PM" : "AM"}</h3>
                </div>
            </div>

        </div>
    )
}

export default Header