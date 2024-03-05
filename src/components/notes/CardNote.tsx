"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '@/app/GlobalRedux/Features/note/noteSlice';

import { AiOutlineDelete } from 'react-icons/ai'
import { FiCalendar, FiCheck, FiClipboard, FiEdit } from 'react-icons/fi'
import { GoDotFill } from 'react-icons/go'
import { BiLoaderAlt } from 'react-icons/bi'
import { useStateContext } from '@/contexts/ContextProvider'
import PleaseWait from '../PleaseWait'
import NoData from '../NoData'
import { MdOutlineCancel } from 'react-icons/md'


interface NoteType {
    _id: string;
    title: string | number;
    description: string;
    createdAt: string | number;
    updatedAt: string | number;
    __v: string | number;
}


const CardNote = ({ dataTrans }: any) => {

    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user)

    const { setShowTimeOut } = useStateContext();
    const [dataNote, setDataNote] = useState<NoteType[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);
    const [confirm, setConfirm] = useState(false);

    //------------------ getData -----------------//
    const getData = async () => {
        let success = 0;
        while (success < 6) {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${user.id}`);
                const data = res.data.messages;
                const sorted = data.sort((a: any, b: any) => {
                    if(b.updatedAt < a.updatedAt) return -1;
                    if(b.updatedAt > a.updatedAt) return 1;
                    return 0;
                })
                setDataNote(sorted);
                dispatch(updateNote(data));
                if (data.length === 0) {
                    setNoData(true);
                }
                success = 9;
            } catch (error) {
                console.log(error)
                await new Promise(res => setTimeout(res, 6000));
                success = success + 1;
                success === 5 && setShowTimeOut(true);
            }
        }
    }

    useEffect(() => {
        if (user.id) {
            getData();
        }
    }, [user.id])

    //----------------- delete data ------------------//
    const [idLoading, setIdLoading] = useState("");

    const handleDelete = async (id: string) => {
        setIdLoading(id);
        setLoading(true);
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`);
            await getData();
            setLoading(false);
            setConfirm(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="">
            {dataNote ?
                <div className="">
                    {noData &&
                        <NoData />
                    }
                    <div className="mt-3 flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-3">

                        {dataNote.map((item: NoteType, index: number) => {
                            return (
                                <div key={index} className='relative dark:bg-slate-700 bg-gray-100 p-5 rounded-2xl flex flex-col gap-3 shadow-md'>
                                    {confirm && item._id === idLoading ?
                                        <div className="absolute right-3 top-3 text-xl flex gap-2 items-center">
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="hover:scale-125 transition cursor-pointer">
                                                {loading && item._id === idLoading ?
                                                    <BiLoaderAlt size={20} className='animate-spin' />
                                                    :
                                                    <AiOutlineDelete className='text-red-400' />
                                                }
                                            </button>
                                            <button
                                                onClick={() => setConfirm(false)}
                                                className="hover:scale-125 transition cursor-pointer">
                                                <MdOutlineCancel className='text-yellow-400' />
                                            </button>
                                        </div>
                                        :
                                        <div className="absolute right-3 top-3 text-xl flex gap-2 items-center">
                                            <Link href={`/dashboard/note/edit/${item._id}`}>
                                                <div className="hover:scale-125 transition cursor-pointer">
                                                    <FiEdit className='text-yellow-400' />
                                                </div>
                                            </Link>
                                            <button
                                                onClick={() => { setConfirm(true); setIdLoading(item._id) }}
                                                className="hover:scale-125 transition cursor-pointer">
                                                <AiOutlineDelete size={24} className='text-red-400' />
                                            </button>
                                        </div>
                                    }

                                    <div className="flex gap-2 items-center text-gray-400 font-bold text-sm">
                                        <FiCalendar size={21} />
                                        <h3>
                                            {new Date(item.updatedAt).getDate()}-{new Date(item.updatedAt).getMonth() + 1}-{new Date(item.updatedAt).getFullYear()} | {new Date(item.updatedAt).getHours()}:{new Date(item.updatedAt).getMinutes()}
                                        </h3>
                                    </div>

                                    <div className="flex gap-2 items-center font-bold text-xl">
                                        <GoDotFill className='text-blue-500' />
                                        <h3>{item.title}</h3>
                                    </div>

                                    <div className="flex gap-2 text-gray-700 dark:text-gray-300 font-terminal">
                                        <div className="mt-1">
                                            <FiClipboard size={22} />
                                        </div>

                                        <div className="w-full border-gray-200 dark:border-slate-600 p-3 pr-2 rounded-xl border-2">
                                            <textarea
                                                rows={10}
                                                defaultValue={item.description}
                                                className='w-full focus:outline-none bg-transparent pr-1'
                                            />
                                        </div>

                                        {/* <div className='w-full py-2 px-4 rounded-xl max-h-[302px] overflow-y-auto overflow-x-hidden border-2 border-gray-200 dark:border-slate-600 shadow-sm'>
                                            {item.description.split("\n").map((item: string, index:number) => {
                                                return (
                                                    <div key={index} className="">{item}</div>
                                                )
                                            })}
                                        </div> */}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                :
                <PleaseWait />
            }
        </div>
    )
}

export default CardNote

{/* <div dangerouslySetInnerHTML={{ __html: noteContent }} /> */ }