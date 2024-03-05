"use client"
import React, { useState } from 'react'
import { Card, Header, List } from '@/components'


const page = () => {

    const [showTask, setShowTask] = useState("allTask");

    return (
        <div>
            <Header page="Dashboard" item="Task Progress" />

            <div className="xl:flex gap-3">
                <div className="xl:w-[49.8%]">
                    <Card setDataTrans={setShowTask} />
                </div>

                <div className="mt-3 xl:mt-0 xl:w-[49.8%]">
                    <List dataShow={showTask}/>
                </div>
            </div>
        </div>
    )
}

export default page