"use client"
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useStateContext } from '@/contexts/ContextProvider';
import PleaseWait from '../PleaseWait';
import { FiLoader } from 'react-icons/fi';
import downloadAsExcel from '../../utils/downloadAsExcel';

interface TypeUser {
    id: string,
    name: string,
    email: string,
    role: string,
    createdAt: string,
    updatedAt: string,
    isVerified: boolean,
}

interface TypeDateFormat {
    year?: 'numeric' | '2-digit',
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow',
    day?: 'numeric' | '2-digit',
    hour?: 'numeric' | '2-digit',
    minute?: 'numeric' | '2-digit',
    second?: 'numeric' | '2-digit',
    timeZoneName?: 'short'
}

const Userlist = () => {

    const { setShowTimeOut } = useStateContext();
    const user = useSelector((state: any) => state.user);
    const [allUser, setAllUser] = useState<TypeUser[] | null>(null);
    const [noData, setNoData] = useState(false);

    // // -------------------- get Data ---------------- // //
    const getData = async () => {
        let success = 0;
        while (success < 6) {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            const config = {
                headers: {
                    'Authorization': `${token}`
                }
            };
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/userlist`, config);
                const data = res.data.messages;
                setAllUser(data);
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
        getData();
    }, [])

    const parseDateIndo = (dateInput: string) => {
        const date = new Date(dateInput);
        date.setUTCHours(date.getUTCHours());
        const options: TypeDateFormat = {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            // second: '2-digit',
            timeZoneName: 'short'
        };
        const formatter = new Intl.DateTimeFormat('id-ID', options);
        const dateTimeIndonesia = formatter.format(date);

        return dateTimeIndonesia
    }


    // // ------------------ handle Verified -------------- // //
    const [loading, setLoading] = useState(false);
    const [idLoading, setIdLoading] = useState("");

    const handleVerified = async (id: string, isVerified: boolean) => {
        setIdLoading(id)
        setLoading(true);
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        };
        if (id !== process.env.NEXT_PUBLIC_ADMIN_ID) {
            try {
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/userlist/${id}`, {
                    newVerified: !isVerified
                }, config);
                await getData();
                setLoading(false);
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        } else {
            setLoading(false);
        };
    }


    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const paginateData = (data: TypeUser[]): TypeUser[] => {
        const indexLast = currentPage * perPage;
        const indexFirst = indexLast - perPage;
        return data.slice(indexFirst, indexLast);
    }

    return (
        <div className="">
            <div className='font-bold text-sm py-1 px-3 rounded text-center text-gray-600 dark:text-gray-300'>Account List</div>
            <button onClick={() => downloadAsExcel(allUser, "AllUser.xlsx")} className='bg-gray-100 dark:bg-slate-900 rounded-md px-3 py-1 text-sm '>Download</button>
            {allUser ?
                <div className='overflow-x-auto mt-2'>
                    <table className='min-w-[950px] mb-2 mx-auto'>
                        <thead>
                            <tr className='border-b border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-900'>
                                <th className='text-gray-500 dark:text-gray-400 py-1 px-3 text-sm'></th>
                                <th className='text-gray-500 dark:text-gray-400 py-1 px-2 text-sm'>Usename</th>
                                <th className='text-gray-500 dark:text-gray-400 py-1 px-2 text-sm'>Status</th>
                                <th className='text-gray-500 dark:text-gray-400 py-1 px-2 text-sm'>Email</th>
                                <th className='text-gray-500 dark:text-gray-400 py-1 px-2 text-sm'>Role</th>
                                <th className='text-gray-500 dark:text-gray-400 py-1 px-2 text-sm'>Created at</th>
                                <th className='text-gray-500 dark:text-gray-400 py-1 px-2 text-sm'>Updated at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUser.map((item: TypeUser, index: number) => {
                                return (
                                    <tr
                                        key={index}
                                        className={`border-b border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 ${index % 2 !== 0 ? "bg-gray-100 dark:bg-slate-900" : ""}`}
                                    >
                                        <th className='py-2 px-4 text-sm'>{index + 1}</th>
                                        <td className='text-md py-3 px-2 text-sm'>{item.name}</td>
                                        {item.isVerified ?
                                            <td>
                                                {loading && item.id === idLoading ?
                                                    <FiLoader className='animate-spin-slow mx-auto' />
                                                    :
                                                    <button
                                                        onClick={() => { handleVerified(item.id, item.isVerified) }}
                                                        className='text-md py-3 px-2 text-sm flex gap-2 items-center'>
                                                        <div className='w-2 h-2 rounded-full bg-green-500'></div><p>Verified</p>
                                                    </button>
                                                }
                                            </td>
                                            :
                                            <td>
                                                {loading && item.id === idLoading ?
                                                    <FiLoader className='animate-spin-slow mx-auto' />
                                                    :
                                                    <button
                                                        onClick={() => handleVerified(item.id, item.isVerified)}
                                                        className='text-md py-3 px-2 text-sm flex gap-2 items-center'>
                                                        <div className='w-2 h-2 rounded-full bg-red-500'></div><p>not Verified</p>
                                                    </button>
                                                }
                                            </td>
                                        }
                                        <td className='text-md py-3 px-2 text-sm'>{item.email}</td>
                                        <td className='text-md py-3 px-2 text-sm'>{item.role}</td>
                                        <td className='text-md py-3 px-2 text-sm'>{parseDateIndo(item.createdAt)}</td>
                                        <td className='text-md py-3 px-2 text-sm'>{parseDateIndo(item.updatedAt)}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
                :
                <PleaseWait />
            }
        </div>
    )
}

export default Userlist