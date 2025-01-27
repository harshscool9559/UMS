import React from 'react'
import Subjects from './Subjects'
import { UserProvider } from '@/context/userContext';


const Page = () => {
  return (
    <div>
    <UserProvider>
      <Subjects />
      </UserProvider>
    </div>
  )
}

export default Page;
