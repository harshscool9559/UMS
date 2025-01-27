import React from 'react';
import { ImBooks } from "react-icons/im";
import Link from 'next/link';

const Cards = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-5 px-10 py-10'>
      {[
        { title: 'Students', link: '/Screens/teacher/Studentcard', color: 'bg-gradient-to-r from-purple-500 to-indigo-500' },
        { title: 'Attendance', link: '/Screens/teacher/Attendece', color: 'bg-gradient-to-r from-green-500 to-teal-500' },
        { title: 'Notification', link: '/Screens/teacher', color: 'bg-gradient-to-r from-pink-500 to-red-500' },
      ].map((card, index) => (
        <div
          key={index}
          className={`${card.color} w-full h-32 border-2 border-white text-center p-6 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl relative group overflow-hidden`}
        >
          <div className="absolute inset-0 bg-white opacity-10 group-hover:opacity-0 transition-opacity duration-300"></div>
          <ImBooks className='text-center text-white w-12 h-7 mx-auto animate-bounce mb-2' />
          <Link href={card.link}>
            <span className="text-white text-lg font-semibold animate-fadeInUp tracking-wide transition duration-300 group-hover:scale-110">
              {card.title}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;
