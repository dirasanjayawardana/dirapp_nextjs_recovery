"use client"
import React from 'react'
import { Header, Table1, Table2 } from '@/components'

const page = () => {
  return (
    <div className="">
      <Header page="Dashboard" item="Payment Status" />

      <div className="flex flex-col gap-5 sm:items-center 2xl:flex-row 2xl:justify-around">
        <Table1 />
        <Table2 />
      </div>
    </div>
  )
}

export default page