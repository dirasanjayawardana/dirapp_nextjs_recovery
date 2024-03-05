"use client"
import { useStateContext } from '@/contexts/ContextProvider'
import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { FiLoader, FiRefreshCw } from 'react-icons/fi'
import { PiWarningBold } from 'react-icons/pi'

const PleaseWait = () => {

    const { showTimeOut } = useStateContext()

    return (
        <div className='font-terminal w-full'>
            {showTimeOut ?
                <div className="bg-[#fbbd23] my-3 rounded-xl py-2 px-4 flex items-center justify-center text-black">
                    <div className="flex gap-2 items-center">
                        <PiWarningBold />
                        <p>Connection timeout, refresh your browser</p>
                        <button
                            className='p-2 rounded-full bg-gray-100 dark:bg-slate-700 text-black dark:text-white hover:scale-110 transition'>
                            <FiRefreshCw />
                        </button>
                    </div>
                </div>
                :
                <div className="bg-gray-100 dark:bg-slate-700 my-3 rounded-xl py-2 px-4 flex items-center justify-center">
                    <div className="flex gap-3 items-center">
                        <p>Please wait</p> <FiLoader size={20} className='animate-spin-slow' />
                    </div>
                </div>
            }
        </div>
    )
}

export default PleaseWait