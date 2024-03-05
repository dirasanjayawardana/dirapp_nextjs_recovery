"use client"
import { ChartArea, ChartBar, ChartBarHorizontal, ChartLine, Header } from '@/components'
import React from 'react'

const Chart = () => {
  return (
    <div>
      <Header page="Dashboard" item="Charts"/>

      <div className="flex flex-col xl:flex-row gap-3">
        <div className="dark:bg-slate-700 bg-gray-100 px-4 py-6 rounded-xl xl:w-[49.7%] shadow-md">
          <ChartBar />
        </div>

        <div className="dark:bg-slate-700 bg-gray-100 px-4 py-6 rounded-xl xl:w-[49.7%] shadow-md">
          <ChartLine />
        </div>
      </div>

      <div className="mt-3 flex flex-col xl:flex-row gap-3">
        <div className="dark:bg-slate-700 bg-gray-100 px-4 py-6 rounded-xl xl:w-[39.6%] flex items-center shadow-md">
          <ChartBarHorizontal />
        </div>

        <div className="dark:bg-slate-700 bg-gray-100 px-4 py-6 rounded-xl xl:w-[60%] shadow-md">
          <ChartArea />
        </div>
      </div>
    </div>
  )
}

export default Chart