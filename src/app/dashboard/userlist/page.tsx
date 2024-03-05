"use client"
import React, { useState } from 'react'
import { Header, Userlist } from '@/components'


const page = () => {

    const [showTask, setShowTask] = useState("allTask");

    return (
        <div>
            <Header page="Administrator" item="Userlist" />

            <div className="flex flex-col gap-5 xl:items-center 2xl:flex-row 2xl:justify-around">
                <Userlist />
            </div>
        </div>
    )
}

export default page