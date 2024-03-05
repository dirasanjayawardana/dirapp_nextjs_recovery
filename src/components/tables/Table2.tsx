"use client"
import React from 'react'

const Table2 = () => {
    return (
        <div className="">
            <div className='font-bold text-sm py-1 px-3 rounded text-center text-gray-600 dark:text-gray-300'>Payment Status</div>
            <div className='overflow-x-auto mt-2'>
                <table className='min-w-[600px] mb-2 mx-auto'>
                    <thead>
                        <tr className='border-b border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-900'>
                            <th className='text-gray-500 dark:text-gray-400 py-1 px-3 text-sm'></th>
                            <th className='text-gray-500 dark:text-gray-400 py-1 px-3 text-sm'>Name</th>
                            <th className='text-gray-500 dark:text-gray-400 py-1 px-3 text-sm'>Status</th>
                            <th className='text-gray-500 dark:text-gray-400 py-1 px-3 text-sm'>Date</th>
                            <th className='text-gray-500 dark:text-gray-400 py-1 px-3 text-sm'>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 10 }, (_, index) => index + 1).map((item: number, index: number) => {
                            return (
                                <tr
                                    key={index}
                                    className={`border-b border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 ${index % 2 !== 0 ? "bg-gray-100 dark:bg-slate-900" : ""}`}
                                >
                                    <th className='py-2 px-4 text-sm'>{item}</th>
                                    <td className='text-md py-3 px-4 text-sm'>Lorem ipsum</td>
                                    <td className='text-md py-3 px-4 text-sm flex gap-2 items-center'>
                                        <div className='w-2 h-2 rounded-full bg-green-400'></div><p>Success</p>
                                    </td>
                                    <td className='text-md py-3 px-4 text-sm'>Sunday, 24-Aug-2023</td>
                                    <td className='text-md py-3 px-4 text-sm'>loremipsum@gmail.com</td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table2