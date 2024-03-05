"use client"
import React from 'react'
import { Header, Statistic, WindowBio } from '@/components'
import { useSelector } from 'react-redux'

const page = () => {

    const user = useSelector((state: any) => state.user);

    return (
        <div className=''>
            <Header page="Hello," item={user.name} />
            <div className="">
                <Statistic />
            </div>
            <div className=" mt-5">
                <WindowBio />
            </div>
        </div>
    )
}

export default page