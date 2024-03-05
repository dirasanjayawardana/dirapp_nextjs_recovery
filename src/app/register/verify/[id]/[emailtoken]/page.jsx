'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { FiCheck, FiXCircle } from 'react-icons/fi'


const page = () => {

    const params = useParams();
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    useEffect(async () => {
        try {
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/register/verify/${params.id}/${params.emailtoken}`);
            setVerified(true);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }, [params.id, params.emailtoken])

    return (
        <div className='bg-slate-800 text-white min-h-screen pb-3 flex flex-col justify-center items-center'>
            {verified &&
                <div className=" flex flex-col justify-center items-center gap-5 border-2 border-gray-500 rounded-xl p-6">
                    <div className="flex items-center gap-2">
                        <FiCheck size={28} color='#5AE58D' />
                        <h3>Your email has been verified</h3>
                    </div>

                    <Link href='/login'>
                        <p>Continue to <button className='text-blue-500 hover:underline'>Sign in.</button></p>
                    </Link>
                </div>
            }
            {error &&
                <div className=" flex flex-col justify-center items-center gap-5 border-2 border-gray-500 rounded-xl p-6">
                    <div className="flex items-center gap-2">
                        <FiXCircle size={28} color='#E54B4B' />
                        <h3>Error verification link</h3>
                    </div>
                </div>
            }
        </div>
    )
}

export default page