"use client"
import React from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { PiWarningBold } from 'react-icons/pi'

const NoData = () => {
    return (
        <div className='my-3 bg-[#fbbd23] rounded-xl text-black p-2 px-4 flex gap-1 items-center justify-center w-full'>
            <PiWarningBold /><p>There is no data. Clik</p> <p><AiOutlineFileAdd /></p> <p>to add New</p>
        </div>
    )
}

export default NoData