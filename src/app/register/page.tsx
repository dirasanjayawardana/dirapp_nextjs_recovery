"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { useStateContext } from '@/contexts/ContextProvider'
import { FiCheck, FiLoader, FiLock, FiMail, FiUser } from 'react-icons/fi'
import logo from '../../data/logo.png'


const page = () => {

    const { currentMode } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState("");
    const [verifiedMessage, setVerifiedMessage] = useState(false);

    // // -------------- handleSubmit Register ------------ // //
    const handleSubmit = async () => {
        setLoading(true);
        if (form.password !== confirm) {
            setError("Missing confirm")
            setLoading(false);
        } else {
            setError("")
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, form);
                setVerifiedMessage(true);
            } catch (error: any) {
                console.log(error);
                setError(error.response.data)
                setLoading(false);
            }
        }
    }

    return (
        <div className={`${currentMode === "dark" ? "dark" : ""}`}>
            <div className="bg-gray-100 min-h-[100vh] py-[5vh] sm:py-[8vh] dark:bg-slate-800 dark:text-gray-200">
                <div className="flex flex-col items-center gap-3 mx-auto px-2 w-80">
                    <div className="w-14 h-14">
                        <Image src={logo} alt='logo' />
                    </div>

                    <h3 className='tracking-normal text-2xl'>
                        Sign in to <span className="font-bold text-3xl text-[#1798fe]">D</span>ir<span className="font-bold text-3xl text-[#1798fe]">A</span>pp
                    </h3>

                    {verifiedMessage ?
                        <div className="mt-3 bg-gray-20 rounded-xl p-5 shadow- border w-full border-gray-300 dark:bg-slate-70 dark:border-slate-600 bg-black/30">
                            <div className="flex items-center gap-3">
                                <FiCheck size={30} color='#5AE58D' />
                                <h3>Please check your email and verify your acount.</h3>
                            </div>
                        </div>
                        :
                        <div className="mt-3 bg-gray-20 rounded-xl p-5 shadow- border w-full border-gray-300 dark:bg-slate-70 dark:border-slate-600 bg-black/30">
                            <div
                                className='flex flex-col gap-2'
                            >
                                <label className='text-sm flex gap-1 items-center'>
                                    <FiUser />
                                    <span>Your Name</span>
                                </label>
                                {error === "Missing fields" &&
                                    <h5 className='text-red-500 text-xs -mt-2 ml-1'>*{error}</h5>
                                }
                                <input
                                    type='text'
                                    placeholder='Username'
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className='bg-gray-100 rounded-md py-2 px-3 text-sm border border-gray-300 dark:bg-slate-800 dark:border-slate-600'
                                />

                                <label className='mt-2 text-sm flex gap-1 items-center'>
                                    <FiMail />
                                    <span>Email</span>
                                </label>
                                {error === "Email already use" &&
                                    <h5 className='text-red-500 text-xs -mt-2 ml-1'>*{error}</h5>
                                }
                                <input
                                    type='text'
                                    placeholder='Username'
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className='bg-gray-100 rounded-md py-2 px-3 text-sm border border-gray-300 dark:bg-slate-800 dark:border-slate-600'
                                />

                                <label className='mt-2 text-sm flex justify-between'>
                                    <p className='flex gap-1 items-center'>
                                        <FiLock />
                                        <span>Password</span>
                                    </p>
                                </label>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    className='bg-gray-100 rounded-md py-2 px-3 text-sm border border-gray-300 dark:bg-slate-800 dark:border-slate-600'
                                />

                                <label className='mt-2 text-sm flex justify-between'>
                                    <p className='flex gap-1 items-center'>
                                        <FiCheck />
                                        <span>Confirm Password</span>
                                    </p>
                                </label>
                                {error === "Missing confirm" &&
                                    <h5 className='text-red-500 text-xs -mt-2 ml-1'>*{error}</h5>
                                }
                                <input
                                    type='password'
                                    placeholder='Confirm Password'
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className='bg-gray-100 rounded-md py-2 px-3 text-sm border border-gray-300 dark:bg-slate-800 dark:border-slate-600'
                                />

                                <button
                                    type='button'
                                    onClick={handleSubmit}
                                    className='mt-1 bg-[#1798fe] rounded-md text-sm py-2 text-white font-bold hover:bg-[#0e7bce]'>
                                    {loading ?
                                        <FiLoader size={20} className='mx-auto animate-spin-slow' />
                                        :
                                        <span>Sign up</span>
                                    }
                                </button>
                            </div>
                        </div>
                    }


                    <div className="text-sm border border-gray-300 w-full rounded-xl py-4 flex justify-center items-center dark:border-slate-600">
                        <Link href='/login'>
                            <p>Already have an account? <button className='text-blue-500 hover:underline'>Sign in.</button></p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page