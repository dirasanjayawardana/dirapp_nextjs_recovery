"use client"
import React, { useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Header, SearchForm } from '@/components'
import { FaTerminal } from 'react-icons/fa'
import { FiSave } from 'react-icons/fi'
import { BiLoaderAlt } from 'react-icons/bi'
import { MdOutlineCancel } from 'react-icons/md'

const page = () => {

    const router = useRouter();
    const user = useSelector((state: any) => state.user)

    const [noteTitle, setNoteTitle] = useState("")
    const [noteContent, setNoteContent] = useState("")
    const [loading, setLoading] = useState(false);


    const handleNoteTitle = (e: any) => {
        e.preventDefault();
        setNoteTitle(e.target.value);
    };

    const handleTextareaChange = (e: any) => {
        e.preventDefault();
        setNoteContent(e.target.value);
        e.target.rows = e.target.value.split('\n').length;
    };

    const handleTextareaKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            setNoteContent((prevContent) => prevContent + '\n');
        }
    };

    const handleSave = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, {
                method: "POST",
                headers: {
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    title: noteTitle,
                    userId: user.id,
                    description: noteContent
                })
            });

            router.push('/dashboard/note')
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div>
            <Header page="Dashboard" item="Notes" />
            <SearchForm />

            <div className='mt-4 bg-gray-100 dark:bg-slate-700 rounded-2xl overflow-hidden'>

                <div className="w-full h-10 bg-gray-200 dark:bg-slate-600 flex items-center gap-2 pl-3">
                    <div className='w-3 h-3 rounded-full bg-[#f87272]'></div>
                    <div className='w-3 h-3 rounded-full bg-[#fbbd23]'></div>
                    <div className='w-3 h-3 rounded-full bg-[#0bc9c9]'></div>
                    <div className="flex w-full justify-between pl-2 items-center text-gray-500 dark:text-gray-300 gap-3 py-1">
                        <FaTerminal />
                        <div className="flex">
                            <button
                                onClick={() => router.push('/dashboard/note')}
                                className='h-full py-[7px] px-2 bg-red-400 flex items-center gap-2 font-bold text-white hover:bg-red-500'>
                                <MdOutlineCancel size={22} />
                                <h5 className='text-sm'>Cancel</h5>
                            </button>
                            <button
                                onClick={handleSave}
                                className="h-full py-[7px] px-3 bg-blue-500 flex items-center gap-2 font-bold text-white hover:bg-blue-600">
                                {loading ?
                                    <BiLoaderAlt size={22} className='animate-spin' />
                                    :
                                    <FiSave size={22} />
                                }
                                <h5 className='text-sm'>Save</h5>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="font-terminal rounded-md text-gray-500 dark:text-gray-300 text-sm sm:p-5 py-5 px-3">
                    <input
                        type='text'
                        onChange={handleNoteTitle}
                        className='bg-transparent text-xl font-bold px-5 focus:outline-none rounded-xl border-2 border-gray-100 dark:border-slate-700 w-full' placeholder='Input title' />
                    <textarea
                        // cols={50}
                        rows={noteContent.split('\n').length}
                        value={noteContent}
                        onChange={handleTextareaChange}
                        onKeyDown={handleTextareaKeyDown}
                        placeholder='Type your note here'
                        className='min-h-screen w-full mt-5 sm:p-5 p-3 rounded-xl bg-transparent border-4 focus:outline-none border-gray-200 dark:border-slate-600'
                    />
                </div>

            </div>

        </div>
    )
}

export default page