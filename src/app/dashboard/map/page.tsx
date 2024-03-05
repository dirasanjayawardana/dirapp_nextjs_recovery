'use client'
import { Header } from '@/components'
import Map from '@/components/maps'
import React from 'react'

const page = () => {
  return (
    <div className='w-full'>
      <Header page="Bookmark" item="Maps" />
      
      <Map />
    </div>
  )
}

export default page