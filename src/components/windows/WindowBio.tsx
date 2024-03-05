"use client"
import React, { useState } from 'react'
import { FaTerminal } from 'react-icons/fa'

const WindowBio = () => {

    const [showWindow, setShowWindow] = useState("profile")

    return (
        <div className='bg-gray-100 dark:bg-slate-700 max-w-[1200px] rounded-2xl overflow-hidden'>

            <div className="w-full h-10 bg-gray-200 dark:bg-slate-600 flex items-center gap-2 pl-3">
                <div className='w-3 h-3 rounded-full bg-[#f87272]'></div>
                <div className='w-3 h-3 rounded-full bg-[#fbbd23]'></div>
                <div className='w-3 h-3 rounded-full bg-[#0bc9c9]'></div>
                <div className="flex items-center ml-2 text-gray-500 dark:text-gray-300 gap-3">
                    <FaTerminal />
                    <button
                        onClick={() => setShowWindow("profile")}
                        className={`${showWindow === "profile" ? "bg-white dark:bg-slate-800" : "bg-gray-100 dark:bg-slate-700"} text-sm font-terminal rounded-md py-1 px-2`}>
                        MyProfile.tsx
                    </button>
                    <button
                        onClick={() => setShowWindow("rules")}
                        className={`${showWindow === "rules" ? "bg-white dark:bg-slate-800" : "bg-gray-100 dark:bg-slate-700"} text-sm font-terminal rounded-md py-1 px-2`}>
                        Rules.tsx
                    </button>
                </div>
            </div>

            <div className="font-terminal rounded-md text-gray-500 dark:text-gray-300 text-sm flex">

                <div className="min-w-[48px] max-w-[48px] md:w-20 min-h-full bg-white dark:bg-slate-800 rounded-bl-2xl border-l-4 border-b-4 border-gray-100 dark:border-slate-700" />

                {showWindow === "profile" ?
                    <ol className='m-5 ml-0 list-outside list-decimal flex flex-col gap-2'>
                        <li><p className='ml-3'>Welcome to DirApp...</p></li>
                        <li><p className='ml-3'>My name's Dira Sanjaya Wardana,</p></li>
                        <li><p className='ml-3'>I'm An Electrical Engineering</p></li>
                        <li><p className='ml-3'>...</p></li>
                        <li><p className='ml-3'>I am graduated in electrical engineering with a concentration in Electrical Power Engineering. I am proficiant with power electronics, energy conversion, microcontroller programing, and electronic system design. </p></li>
                        <li><p className='ml-3'>...</p></li>
                        <li><p className='ml-3'>I never limiting my self to learn other things, such as web programing, network, machine learning, and controlling. I have good leadership, great time management and excited with challenging job</p></li>
                        <li><p className='ml-3'>.....</p></li>
                        <li><p className='ml-3'>....</p></li>
                        <li><p className='ml-3'>...</p></li>
                        <li><p className='ml-3'>..</p></li>
                        <li><p className='ml-3'>.</p></li>
                    </ol>
                    :
                    <ol className='m-5 ml-0 list-outside list-decimal flex flex-col gap-2'>
                        <li><p className='ml-3'>Rules for using this website!</p></li>
                        <li><p className='ml-3'>...</p></li>
                        <li><p className='ml-3'>.</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                        <li><p className='ml-3'>......</p></li>
                    </ol>
                }
            </div>

        </div>
    )
}

export default WindowBio