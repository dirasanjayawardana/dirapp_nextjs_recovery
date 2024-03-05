import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { FiLoader } from 'react-icons/fi'

const loading = () => {
    return (
        <div className='min-h-screen min-w-full bg-slate-800 text-white flex items-center justify-center'>
            <FiLoader size={30} className='animate-spin-slow' />
        </div>
    )
}

export default loading