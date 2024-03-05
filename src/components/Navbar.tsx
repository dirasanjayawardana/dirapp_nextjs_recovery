"use client"
import { useStateContext } from '@/contexts/ContextProvider'
import React from 'react'
import { FiChevronDown, FiMenu, FiUser } from 'react-icons/fi'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import logo from '../data/logo.png'
import Image from 'next/image'

const Navbar = () => {

    const { showSidebar, setShowSidebar, currentColor } = useStateContext()

    return (
        <div className='px-6 py-3 flex gap-8 justify-between bg-white/[0.95] dark:bg-slate-800/[0.95] shadow-md rounded-b-2xl'>
            <div className="flex gap-2 items-center">
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="text-2xl hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl p-2">
                    <FiMenu />
                </button>
                <Image src={logo} alt='logo' height={40} width={40} />
            </div>

            {/* <div className='hidden sm:flex gap-2 items-center text-xl font-bold'>
                    <FiHome className='text-2xl' />
                    <h3>Homepage</h3>
                </div> */}

            <div className="flex gap-1 items-center hover:scale-110 transition-all cursor-pointer font-bold text-sm">
                <div className={`bg-[${currentColor}] p-2 rounded-full text-white shadow-md`}>
                    <FiUser className='' />
                </div>
                {/* <h3 className=''>Profile</h3> */}
                <div className="mt-1"><FiChevronDown /></div>
            </div>
        </div>
    )
}

export default Navbar