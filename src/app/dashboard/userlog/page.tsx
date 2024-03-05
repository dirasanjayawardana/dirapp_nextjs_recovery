"use client"
import React, { useState } from 'react'
import { Header, Userlist } from '@/components'
import Userlog from '@/components/users/Userlog';


const page = () => {

    const [showTask, setShowTask] = useState("allTask");

    return (
        <div>
            <Header page="Administrator" item="Userlog" />

            <div className="flex flex-col gap-5 xl:items-center 2xl:flex-row 2xl:justify-around">
                <Userlog />
            </div>
        </div>
    )
}

export default page