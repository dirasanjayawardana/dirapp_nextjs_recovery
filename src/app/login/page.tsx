"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { BsGoogle } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { FiLoader, FiLock, FiUser, FiUserCheck } from 'react-icons/fi'
import { useStateContext } from '@/contexts/ContextProvider'
import logo from '../../data/logo.png'
// import background from '../../data/background.jpg'

const page = () => {

    const router = useRouter();
    const { currentMode } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    //-------------- handleSubmit Login ------------//
    const handleSubmit = async () => {
        setLoading(true);
        setError("")
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, form);
            // localStorage.setItem('token', res.data.token);
            router.push('/dashboard');
        } catch (error: any) {
            console.log(error);
            setError(error.response.data.message)
            setLoading(false);
        }
    }

    //------------ handleSubmit Guest ------------//
    const handleSubmitGuest = async () => {
        setLoading(true);
        setError("")
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
                email: "test@gmail.com",
                password: "test123"
            });
            // localStorage.setItem('token', res.data.token);
            router.push('/dashboard');
        } catch (error: any) {
            console.log(error);
            setError(error.response.data.message)
            setLoading(false);
        }
    }

    return (
        <div
            className={`${currentMode === "dark" ? "dark" : ""}`}
            // className='bg-gradient-to-r from-indigo-700 via-sky-700 to-violet-700 min-h-screen'
        >
            {/* <div className='fixed h-[100vh] w-[100vw] -z-10'>
                <Image
                    src={background}
                    alt='loading'
                    quality={100}
                    fill
                    sizes="100vw"
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'top'
                    }} />
            </div> */}
            <div className="bg-blac/40 bg-slate-800 min-h-[100vh] py-[5vh] sm:py-[8vh] text-gray-200">
                <div className="flex flex-col items-center gap-3 mx-auto px-2 w-80">
                    <div className="w-14 h-14">
                        <Image src={logo} alt='logo' />
                    </div>

                    <h3 className='tracking-normal text-2xl'>
                        Sign in to <span className="font-bold text-3xl text-[#1798fe]">D</span>ir<span className="font-bold text-3xl text-[#1798fe]">A</span>pp
                    </h3>

                    <div className="mt-3 rounded-xl p-5 shadow- border w-full border-black/30 bg-black/30">
                        <div
                            className='flex flex-col gap-2'
                        >
                            <label className='text-sm flex gap-1 items-center'>
                                <FiUser />
                                <span>Username or Email</span>
                            </label>
                            {error === "User not found" &&
                                <h5 className='text-red-400 text-xs -mt-2 ml-1'>*{error}</h5>
                            }
                            {error === "User not verified" &&
                                <h5 className='text-red-400 text-xs -mt-2 ml-1'>*{error}</h5>
                            }
                            <input
                                type='text'
                                placeholder='Username'
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className='bg-black/30 rounded-md py-2 px-3 text-sm border border-black/30' />

                            <label className='mt-2 text-sm flex justify-between'>
                                <p className='flex gap-1 items-center'>
                                    <FiLock />
                                    <span>Password</span>
                                </p>
                                <button className='text-xs text-blue-400 hover:underline'>Forgot password?</button>
                            </label>
                            {error === "Wrong password" &&
                                <h5 className='text-red-400 text-xs -mt-2 ml-1'>*{error}</h5>
                            }
                            <input
                                type='password'
                                placeholder='Password'
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className='bg-black/30 rounded-md py-2 px-3 text-sm border border-black/30' />
                            <button
                                type='button'
                                onClick={handleSubmit}
                                className='mt-1 bg-[#1798fe] rounded-md text-sm py-2 text-white font-bold hover:bg-[#0e7bce]'>
                                {loading ?
                                    <FiLoader size={20} className='mx-auto animate-spin-slow' />
                                    :
                                    <span>Sign in</span>
                                }
                            </button>
                        </div>
                    </div>

                    <div className="text-sm border border-gray-300 w-full rounded-xl py-4 flex justify-center items-center dark:border-slate-600">
                        <Link href='/register'>
                            <p>New to DirApp? <button className='text-blue-400 hover:underline'>Create an account.</button></p>
                        </Link>
                    </div>

                    <div className="w-full flex items-center gap-2">
                        <hr className='w-full dark:border-slate-700' />
                        <p className='text-xs text-gray-500'>OR</p>
                        <hr className='w-full dark:border-slate-700' />
                    </div>

                    <div className="text-sm w-full cursor-pointer">
                        <button
                            onClick={handleSubmitGuest}
                            className="bg-black/40 rounded-xl py-2 px-4 w-full flex items-center justify-center gap-3 font-bold text-white hover:bg-slate-800">
                            <FiUserCheck size={18} /><p>Sign in as Guest</p>
                        </button>

                        <button className="mt-2 bg-[#dd4b39] rounded-xl py-2 px-4 w-full flex items-center justify-center gap-3 font-bold text-white hover:bg-[#db3620]">
                            <BsGoogle size={16} /><p>Continue with Google</p>
                        </button>

                        <button className="mt-2 bg-[#3b5998] rounded-xl py-2 px-4 w-full flex items-center justify-center gap-3 font-bold text-white hover:bg-[#284c9b]">
                            <FaFacebookF size={16} /><p>Continue with Facebook</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page