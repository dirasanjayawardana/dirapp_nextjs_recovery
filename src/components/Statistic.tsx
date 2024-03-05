"use client"
import React from 'react'
import Image from "next/image";
import { FiUsers } from 'react-icons/fi'
import { MdFavoriteBorder, MdTaskAlt } from 'react-icons/md'
import img from "../data/avatar/avatar3.png"


const Statistic = () => {

    return (
        <div className='bg-white border-2 dark:border-none border-gray-100 dark:bg-slate-700 shadow-md rounded-2xl max-w-3xl sm:flex justify-around'>
            <div className="py-6 px-7 sm:pr-0 sm:pl-5">
                <p className='text-gray-400'>Total Likes</p>
                <div className="mt-1 flex gap-5 items-center justify-between text-3xl font-extrabold text-red-400">
                    <h3>10.2K</h3>
                    <MdFavoriteBorder />
                </div>
                <p className='text-sm text-gray-400'>0% more than last month</p>
            </div>

            <div className="w-full min-h-[3px] max-h-[3px] sm:max-h-full sm:min-h-full sm:w-[3px] bg-gray-200 dark:bg-slate-600"></div>

            <div className="py-6 px-7 sm:px-0">
                <p className='text-gray-400'>Page Views</p>
                <div className="mt-1 flex gap-5 items-center justify-between text-3xl font-extrabold text-blue-500">
                    <h3>130.4K</h3>
                    <FiUsers />
                </div>
                <p className='text-sm text-gray-400'>0% more than last month</p>
            </div>

            <div className="w-full min-h-[3px] max-h-[3px] sm:max-h-full sm:min-h-full sm:w-[3px] bg-gray-200 dark:bg-slate-600"></div>

            <div className="py-6 px-7 sm:px-0">
                <div className="flex gap-10 justify-between text-3xl font-extrabold text-[#36d399]">
                    <h3>76%</h3>
                    <div className='w-16 h-16 overflow-hidden rounded-full border-[4px] border-gray-100 dark:border-slate-600 shadow-md'>
                        <Image src={img} alt='img' />
                    </div>
                </div>
                <p className='-mt-4 text-gray-400'>Task done</p>
                <p className='text-sm text-gray-400'>5 tasks remaining</p>
            </div>
        </div>
    )
}

export default Statistic