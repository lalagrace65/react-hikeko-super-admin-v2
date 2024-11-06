import React from 'react'
import Sidebar from '../components/Sidebar'

export default function BookingSchedulesPage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex-1 p-4'>
          <h1 className="mb-4 text-xl font-semibold">Booking Schedules</h1>
        </div>
    </div>
  )
}
