import React from 'react'

import  { UserProvider } from '@/context/userContext'

import Attendance from './Attendence'


const page = () => {
  return (
    <div>
      <UserProvider>
<Attendance />
      </UserProvider>
    </div>
  )
}

export default page
