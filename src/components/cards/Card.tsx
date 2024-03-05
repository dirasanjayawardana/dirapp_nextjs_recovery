"use client"
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineDelete } from 'react-icons/ai'
import { GrTask } from 'react-icons/gr'
import { BsBell, BsBookmarkCheck, BsCalendar2Event, BsCalendar4Week, BsJournalBookmarkFill } from 'react-icons/bs'
import { FiArchive, FiEdit, FiExternalLink } from 'react-icons/fi'
import PleaseWait from '../PleaseWait'

type CardProps = {
    setDataTrans: (data: string) => void;
};

const Card: React.FC<CardProps> = ({ setDataTrans }) => {

    const taskStore = useSelector((state: any) => state.task);
    const [totalToday, setTotalToday] = useState(0)
    const [totalAllTask, setTotalAllTask] = useState(0)
    const [totalBookmark, setTotalBookmark] = useState(0)
    const [totalSchedule, setTotalSchedule] = useState(0)

    useEffect(() => {
        if (taskStore) {
            setTotalAllTask(taskStore.length);
            setTotalSchedule(taskStore.length);
        }
    }, [taskStore])

    return (
        <div className="">
            {taskStore ?
                <div className="flex xl:grid grid-cols-2 gap-3 overflow-auto pb-2">
                    <div className="relative min-w-[300px] xl:min-w-min max-w-[350px] bg-gray-100 dark:bg-slate-900 rounded-2xl p-4 flex justify-around gap-3 shadow-md">
                        <div
                            onClick={() => setDataTrans("today")}
                            className="flex flex-col gap-3 items-center justify-center w-[42%]">
                            <div className="p-3 bg-[#0bc9c9] rounded-xl text-black">
                                <BsCalendar2Event size={40} />
                            </div>
                            <h3 className='text-[#0bc9c9] text-center text-sm'>Today</h3>
                        </div>

                        <div className="mt-9 rounded-2xl w-[57.8%]">
                            <div
                                onClick={() => setDataTrans("today")}
                                className="flex flex-col gap-1 w-full cursor-pointer">
                                <div className="rounded-xl flex gap-2 items-center justify-between mt-1">
                                    <BsCalendar2Event />
                                    <h3 className='font- text-sm text-end'>Your task today</h3>
                                </div>
                                <div className="w-full h-1 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                                <div className="rounded-xl flex gap-2 items-center justify-between mt-1">
                                    <FiExternalLink size={18} />
                                    <h3 className='font- text-sm'>{totalToday}</h3>
                                </div>
                                <div className="w-full h-1 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                            </div>

                            <div className="absolute top-2 right-2 text-xl flex gap-1 items-center rounded-lg">
                                <div className="hover:scale-125 transition cursor-pointer bg-white dark:bg-slate-800 rounded-full p-[6px]">
                                    <BsBell size={16} className='text-[#36d399]' />
                                </div>
                                <div className="hover:scale-125 transition cursor-pointer bg-white dark:bg-slate-800 rounded-full p-[6px]">
                                    <FiEdit size={16} className='text-[#fbbd23]' />
                                </div>
                                <div className="hover:scale-125 transition cursor-pointer bg-white dark:bg-slate-800 rounded-full p-[6px]">
                                    <AiOutlineDelete size={17} className='text-[#f87272]' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative min-w-[300px] xl:min-w-min max-w-[350px] bg-gray-100 dark:bg-slate-900 rounded-2xl p-4 flex justify-around gap-3 shadow-md">
                        <div
                            onClick={() => setDataTrans("allTask")}
                            className="flex flex-col gap-3 items-center justify-center w-[43%]">
                            <div className="p-3 bg-[#fbbd23] rounded-xl text-black">
                                <GrTask size={40} />
                            </div>
                            <h3 className='text-[#fbbd23] text-center text-sm'>All Task</h3>
                        </div>

                        <div className="mt-9 rounded-2xl w-[57.8%]">
                            <div
                                onClick={() => setDataTrans("allTask")}
                                className="flex flex-col gap-1 w-full cursor-pointer">
                                <div className="rounded-xl flex gap-2 items-center justify-between mt-1">
                                    <BsCalendar2Event />
                                    <h3 className='font- text-sm text-end'>All of Your task</h3>
                                </div>
                                <div className="w-full h-1 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                                <div className="rounded-xl flex gap-2 items-center justify-between mt-1">
                                    <FiExternalLink size={18} />
                                    <h3 className='font- text-sm'>{totalAllTask}</h3>
                                </div>
                                <div className="w-full h-1 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                            </div>

                            <div className="absolute top-2 right-2 text-xl flex gap-1 items-center rounded-lg">
                                <div className="hover:scale-125 transition cursor-pointer bg-white dark:bg-slate-800 rounded-full p-[6px]">
                                    <BsBell size={16} className='text-[#36d399]' />
                                </div>
                                <div className="hover:scale-125 transition cursor-pointer bg-white dark:bg-slate-800 rounded-full p-[6px]">
                                    <FiEdit size={16} className='text-[#fbbd23]' />
                                </div>
                                <div className="hover:scale-125 transition cursor-pointer bg-white dark:bg-slate-800 rounded-full p-[6px]">
                                    <AiOutlineDelete size={17} className='text-[#f87272]' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative min-w-[300px] xl:min-w-min max-w-[350px] bg-gray-100 dark:bg-slate-900 rounded-2xl p-4 flex justify-around gap-3 shadow-md">
                        <div
                            onClick={() => setDataTrans("bookmark")}
                            className="flex flex-col gap-3 items-center justify-center w-[43%]">
                            <div className="p-3 bg-[#f87272] rounded-xl text-black">
                                <BsJournalBookmarkFill size={40} />
                            </div>
                            <h3 className='text-[#f87272] text-center text-sm'>Bookmark</h3>
                        </div>

                        <div className="mt-9 rounded-2xl w-[57.8%]">
                            <div
                                onClick={() => setDataTrans("bookmark")}
                                className="flex flex-col gap-1 w-full cursor-pointer">
                                <div className="rounded-xl flex gap-2 items-center justify-between mt-1">
                                    <BsCalendar2Event />
                                    <h3 className='font- text-sm text-end'>Your bookmark</h3>
                                </div>
                                <div className="w-full h-1 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                                <div className="rounded-xl flex gap-2 items-center justify-between mt-1">
                                    <FiExternalLink size={18} />
                                    <h3 className='font- text-sm'>{totalBookmark}</h3>
                                </div>
                                <div className="w-full h-1 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                            </div>

                            <div className="absolute top-2 right-2 text-xl flex gap-1 items-center rounded-lg">
                                <div className="hover:scale-125 transition cursor-pointer bg-white dark:bg-slate-800 rounded-full p-[6px]">
                                    <BsBell size={16} className='text-[#36d399]' />
                                </div>
                                <div className="hover:scale-125 transition cursor-pointer bg-white dark:bg-slate-800 rounded-full p-[6px]">
                                    <FiEdit size={16} className='text-[#fbbd23]' />
                                </div>
                                <div className="hover:scale-125 transition cursor-pointer bg-white dark:bg-slate-800 rounded-full p-[6px]">
                                    <AiOutlineDelete size={17} className='text-[#f87272]' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative min-w-[300px] xl:min-w-min max-w-[350px] bg-gray-100 dark:bg-slate-900 rounded-2xl p-4 flex justify-around gap-3 shadow-md">
                        <div
                            onClick={() => setDataTrans("schedule")}
                            className="flex flex-col gap-3 items-center justify-center w-[43%]">
                            <div className="p-3 bg-[#36d399] rounded-xl text-black">
                                <BsCalendar4Week size={40} />
                            </div>
                            <h3 className='text-[#36d399] text-center text-sm'>Schedule</h3>
                        </div>

                        <div className="mt-9 rounded-2xl w-[57.8%]">
                            <div
                                onClick={() => setDataTrans("schedule")}
                                className="flex flex-col gap-1 w-full cursor-pointer">
                                <div className="rounded-xl flex gap-2 items-center justify-between mt-1">
                                    <BsCalendar2Event />
                                    <h3 className='font- text-sm text-end'>Your schedule</h3>
                                </div>
                                <div className="w-full h-1 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                                <div className="rounded-xl flex gap-2 items-center justify-between mt-1">
                                    <FiExternalLink size={18} />
                                    <h3 className='font- text-sm'>{totalSchedule}</h3>
                                </div>
                                <div className="w-full h-1 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                            </div>

                            <div className="absolute top-2 right-2 text-xl flex gap-1 items-center rounded-lg">
                                <div className="hover:scale-125 transition cursor-pointer bg-white dark:bg-slate-800 rounded-full p-[6px]">
                                    <BsBell size={16} className='text-[#36d399]' />
                                </div>
                                <div className="hover:scale-125 transition cursor-pointer bg-white dark:bg-slate-800 rounded-full p-[6px]">
                                    <FiEdit size={16} className='text-[#fbbd23]' />
                                </div>
                                <div className="hover:scale-125 transition cursor-pointer bg-white dark:bg-slate-800 rounded-full p-[6px]">
                                    <AiOutlineDelete size={17} className='text-[#f87272]' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <PleaseWait />
            }
        </div>
    )
}

export default Card