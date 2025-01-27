import React from 'react';
import { BsClipboardCheckFill } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import Link from 'next/link';

const Cards = () => {
  return (
    <div className="p-5 sm:p-10 relative z-10 md:mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-center font-bold text-2xl">
        <div className="w-full h-32 border text-center p-6 bg-yellow-300 rounded-xl shadow-lg animate-fadeInUp delay-[100ms]">
          <BsClipboardCheckFill className='text-center text-white w-12 h-7' />
          <Link href="/Attendence"> Attendance </Link>  
        </div>
        <div className="w-full h-32 border text-center p-6 bg-teal-500 rounded-xl shadow-lg animate-fadeInUp delay-[200ms]">
          <ImBooks className='text-center text-white w-12 h-7' />
          <Link href="/Screens/student/Subjects"> Subjects/Courses </Link> 
        </div>

        <div className="w-full h-32 border text-center p-6 bg-sky-400 rounded-xl shadow-lg animate-fadeInUp delay-[300ms]">
          <FaMoneyBillAlt className='text-center text-white w-12 h-7' />
          <Link href="/Screens/student/Attendence"> Accounts </Link> 
        </div>
        
        <div className="w-full h-32 border text-center p-6 bg-pink-500 rounded-xl shadow-lg animate-fadeInUp delay-[400ms]">
          <FcDepartment className='text-center text-white w-12 h-7' />
          <Link href="/Section"> Section </Link> 
        </div>
      </div>
    </div>
  );
}

export default Cards;
