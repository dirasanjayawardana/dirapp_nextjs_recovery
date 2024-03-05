"use client"
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { BsCalendarCheck, BsDot } from 'react-icons/bs'
import { FiCalendar, FiCheck, FiEdit } from 'react-icons/fi'
import PleaseWait from '../PleaseWait';
import { AiOutlineAppstoreAdd, AiOutlineDelete } from 'react-icons/ai';
import NoData from '../NoData';
import { BiLoaderAlt, BiSave } from 'react-icons/bi';
import { useStateContext } from '@/contexts/ContextProvider';
import { MdOutlineCancel } from 'react-icons/md'
import { updateTask } from '@/app/GlobalRedux/Features/task/taskSlice'

interface TaskType {
    _id: string;
    userId: string;
    title: string | number;
    category: string;
    deadline: string;
    description: string;
    createdAt: string | number;
    updatedAt: string | number;
    __v: string | number;
}

const list = ({ dataShow }: { dataShow: string }) => {

    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);

    const { setShowTimeOut } = useStateContext();
    const [dataTask, setDataTask] = useState<TaskType[] | null>(null);
    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAddNew, setShowAddNew] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [showEdit, setShowEdit] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [idLoading, setIdLoading] = useState("");

    // // -------- Get Data By userId -------- // //
    const getData = async () => {
        let success = 0;
        while (success < 6) {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${user.id}`);
                const data = res.data.messages;

                const filteredData = data.filter((item: TaskType) => item.category.includes(dataShow));

                if ((dataShow === "today" && filteredData.length === 0) || (dataShow === "bookmark" && filteredData.length === 0) || data.length === 0) {
                    setNoData(true);
                } else {
                    setNoData(false);
                }

                dispatch(updateTask(data))

                if (dataShow === "allTask" || dataShow === "schedule") {
                    setDataTask(data);
                } else {
                    setDataTask(filteredData);
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
            setNoData(false);
            setDataTask(null);
            setShowAddNew(false);
            getData();
        }
    }, [dataShow, user.id])


    // // -------- Delete Data Task By _Id -------- // //
    const handleDelete = async (id: string) => {
        setIdLoading(id);
        setLoading(true);
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`);
            await getData();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    // // -------- Add New Data Task with userId -------- // //
    const handleSave = async () => {
        setLoading(true);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
                deadline,
                title,
                userId: user.id,
                category: dataShow,
                description,

            });
            await getData();
            setLoading(false);
            setShowAddNew(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    // // -------- Edit Data By _Id -------- // //
    const [titleEdit, setTitleEdit] = useState("");
    const [descriptionEdit, setDescriptionEdit] = useState("");
    const [deadlineEdit, setDeadlineEdit] = useState("");
    const [categoryEdit, setCategoryEdit] = useState("");
    const [idEdit, setIdEdit] = useState("");

    const handleEdit = (id: string) => {
        setShowEdit(true);
        const filterEdit: any = dataTask !== null && dataTask.filter((item: TaskType) => item._id.includes(id));
        setTitleEdit(filterEdit[0].title);
        setDescriptionEdit(filterEdit[0].description);
        setDeadlineEdit(filterEdit[0].deadline);
        setCategoryEdit(filterEdit[0].category);
        setIdEdit(id);
    }

    const handleSaveEdit = async (id: string) => {
        setLoading(true);
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
                newTitle: titleEdit,
                newDescription: descriptionEdit,
                newDeadline: deadlineEdit,
                newCategory: categoryEdit,
            })

            await getData();
            setLoading(false);
            setShowEdit(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    return (
        <div className="">
            {dataTask ?
                <div className='rounded-2xl bg-gray-100 dark:bg-slate-900 p-5 pr-4 shadow-md'>
                    <div className="">

                        <div className="flex gap-3 items-center justify-between -mt-1">
                            <div className="flex gap-2 items-center">
                                <h3 className='font-bold text-lg capitalize'>{dataShow}</h3>
                                <button
                                    onClick={() => {setShowAddNew(true); setNoData(false) }}
                                >
                                    <AiOutlineAppstoreAdd size={23} className='hover:scale-110 transition' />
                                </button>
                            </div>

                            <div className="flex gap-1 -mt-3">
                                <div className='w-3 h-3 rounded-full bg-[#f87272]'></div>
                                <div className='w-3 h-3 rounded-full bg-[#fbbd23]'></div>
                                <div className='w-3 h-3 rounded-full bg-[#0bc9c9]'></div>
                            </div>
                        </div>

                        {noData &&
                            <div className="-mb-5">
                                <NoData />
                            </div>
                        }

                        <div className="mt-5 flex flex-col gap-3 sm:grid sm:grid-cols-2 xl:grid-cols-none">

                            {/* -------- Add New -------- */}
                            <div className={`${showAddNew ? "translate-x-0 opacity-100" : "hidden h-0 w-0 sm:translate-x-96 -translate-x-96 opacity-0 overflow-hidden"} transition-all duration-300 relative p-4 bg-white dark:bg-slate-700 rounded-2xl flex items-center gap-2 shadow-md`}>
                                <div className="absolute right-2 top-2 text-xl flex gap-2 items-center">
                                    {loading ?
                                        <button>
                                            <BiLoaderAlt size={18} className='animate-spin' />
                                        </button>
                                        :
                                        <button
                                            onClick={handleSave}
                                            className="hover:scale-125 transition cursor-pointer -mt-1"
                                        >
                                            <BiSave size={20} className='text-blue-400' />
                                        </button>
                                    }
                                    <div
                                        className="hover:scale-125 transition cursor-pointer">
                                        <button
                                            onClick={() => setShowAddNew(false)}
                                        >
                                            <MdOutlineCancel size={20} className='text-red-400' />
                                        </button>
                                    </div>
                                </div>


                                <div className="flex flex-col gap-2 w-full">
                                    <h3 className='text-gray-400 font-bold flex gap-2 items-center text-xs ml-[2px]'>
                                        <BsCalendarCheck size={13} className='text-red-400' />
                                        <input
                                            type='text'
                                            value={deadline}
                                            onChange={(e: any) => setDeadline(e.target.value)}
                                            placeholder='Deadline'
                                            className='bg-transparent focus:outline-none'
                                        />
                                    </h3>

                                    <div className="flex items-center gap-2 ml-[6px]">
                                        <div className="bg-blue-500 w-[8px] h-[8px] rounded-full"></div>
                                        <h3 className='font-bold'>
                                            <input
                                                type='text'
                                                value={title}
                                                onChange={(e: any) => setTitle(e.target.value)}
                                                placeholder='Task title'
                                                className='bg-transparent focus:outline-none'
                                            />
                                        </h3>
                                    </div>

                                    <div className='text-sm bg-gray-100 dark:bg-slate-900 py-3 pl-4 pr-2 rounded-xl text-gray-700 dark:text-gray-300 w-full max-h-40 overflow-auto'>
                                        <textarea
                                            rows={5}
                                            value={description}
                                            onChange={(e: any) => setDescription(e.target.value)}
                                            placeholder='Task description'
                                            className='bg-transparent w-full focus:outline-none pr-3 placeholder-gray-500'
                                        />
                                    </div>
                                </div>
                            </div>


                            {/* -------- Show List -------- */}
                            {!showEdit &&
                                dataTask.map((item: TaskType, index: number) => {
                                    return (
                                        <div key={index} className="relative p-4 bg-white dark:bg-slate-700 rounded-2xl flex items-center gap-2 shadow-md">
                                            {confirm && item._id === idLoading ?
                                                <div className="absolute right-2 top-2 text-xl flex gap-2 items-center">
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
                                                <div className="absolute right-2 top-2 text-xl flex gap-2 items-center">
                                                    <button
                                                        onClick={() => handleEdit(item._id)}
                                                        className="hover:scale-125 transition cursor-pointer"
                                                    >
                                                        <FiEdit size={16} className='text-yellow-400' />
                                                    </button>
                                                    <button
                                                        onClick={() => {setConfirm(true); setIdLoading(item._id)}}
                                                        className="hover:scale-125 transition cursor-pointer">
                                                        <AiOutlineDelete size={20} className='text-red-400' />
                                                    </button>
                                                </div>
                                            }

                                            <div className="flex flex-col gap-2 w-full">
                                                <h3 className='text-gray-400 font-bold flex gap-2 items-center text-xs'>
                                                    <FiCalendar size={16} className='text-yellow-400' />
                                                    <span>
                                                        {new Date(item.updatedAt).getDate()}-{new Date(item.updatedAt).getMonth() + 1}-{new Date(item.updatedAt).getFullYear()} | {new Date(item.updatedAt).getHours()}:{new Date(item.updatedAt).getMinutes()}
                                                    </span>
                                                </h3>

                                                <h3 className='text-gray-400 font-bold flex gap-[10px] items-center text-xs ml-[1.5px]'><BsCalendarCheck size={13} className='text-red-400' />
                                                    <span>
                                                        {item.deadline}
                                                    </span>
                                                </h3>

                                                <div className="flex items-center gap-3 ml-1">
                                                    <div className="bg-blue-500 w-[8px] h-[8px] rounded-full"></div>
                                                    <input
                                                        disabled
                                                        type='text'
                                                        defaultValue={item.title}
                                                        className='font-bold bg-transparent focus:outline-none' />
                                                </div>

                                                <div className='text-sm bg-gray-100 dark:bg-slate-900 py-3 pl-4 pr-2 rounded-xl text-gray-700 dark:text-gray-300 w-full max-h-40 overflow-auto'>
                                                    <textarea
                                                        disabled
                                                        rows={5}
                                                        value={item.description}
                                                        className='bg-transparent w-full focus:outline-none pr-3'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            {/* -------- Show Edit -------- */}
                            {showEdit &&
                                <div className="relative p-4 bg-white dark:bg-slate-700 rounded-2xl flex items-center gap-2 shadow-md">
                                    <div className="absolute right-2 top-2 text-xl flex gap-2 items-center">
                                        {loading ?
                                            <button>
                                                <BiLoaderAlt size={18} className='animate-spin' />
                                            </button>
                                            :
                                            <button
                                                onClick={() => handleSaveEdit(idEdit)}
                                                className="hover:scale-125 transition cursor-pointer -mt-1"
                                            >
                                                <BiSave size={20} className='text-blue-400' />
                                            </button>
                                        }
                                        <div
                                            className="hover:scale-125 transition cursor-pointer">
                                            <button
                                                onClick={() => setShowEdit(false)}
                                            >
                                                <MdOutlineCancel size={20} className='text-red-400' />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 w-full">
                                        <h3 className='text-gray-400 font-bold flex gap-2 items-center text-xs ml-[2px]'>
                                            <BsCalendarCheck size={13} className='text-red-400' />
                                            <input
                                                type='text'
                                                value={deadlineEdit}
                                                onChange={(e: any) => setDeadlineEdit(e.target.value)}
                                                placeholder='Deadline'
                                                className='bg-transparent focus:outline-none'
                                            />
                                        </h3>

                                        <div className="flex items-center gap-2 ml-[6px]">
                                            <div className="bg-blue-500 w-[8px] h-[8px] rounded-full"></div>
                                            <h3 className='font-bold'>
                                                <input
                                                    type='text'
                                                    value={titleEdit}
                                                    onChange={(e: any) => setTitleEdit(e.target.value)}
                                                    placeholder='Task title'
                                                    className='bg-transparent focus:outline-none'
                                                />
                                            </h3>
                                        </div>

                                        <div className='text-sm bg-gray-100 dark:bg-slate-900 py-3 pl-4 pr-2 rounded-xl text-gray-700 dark:text-gray-300 w-full max-h-40 overflow-auto'>
                                            <textarea
                                                rows={5}
                                                value={descriptionEdit}
                                                onChange={(e: any) => setDescriptionEdit(e.target.value)}
                                                placeholder='Task description'
                                                className='bg-transparent w-full focus:outline-none pr-3 placeholder-gray-500'
                                            />
                                        </div>
                                    </div>
                                </div>
                            }


                        </div>
                    </div>
                </div>
                :
                <PleaseWait />
            }
        </div>
    )
}

export default list