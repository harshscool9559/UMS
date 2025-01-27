import React from 'react'
import Student from '../Studentcard/Allstudents/students'
import { StudentProvider } from '../../../../context/StudentContext';

const page = () => {
  return (
    <div>
    <StudentProvider>
      <Student />
    </StudentProvider>
    </div>
  )
}

export default page
