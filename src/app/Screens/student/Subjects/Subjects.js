"use client";

import { FaClock } from 'react-icons/fa';
import UserContext from '../../../../context/userContext';
import React, { useContext } from 'react';


const getCurrentDate = () => {
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return today.toLocaleDateString('en-US', options); 
};

const Subjects = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen ">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 rounded-full  shadow-lg animate-spinSlow transform scale-125"></div>
        <FaClock className="text-6xl text-blue-900 animate-bounce" />
        <span className="absolute text-lg font-semibold text-white mt-52">
          Loading Attendance...
        </span>
      </div>
    </div>
    )
  }

  if (!user) {
    return <div>No user data available</div>; 
  }

  return (
    <div className='p-20 text-black w-full bg-blue-300 h-[800px]'>
      <div className='border-[1px] p-10 bg-white shadow-2xl rounded-md animate-fadeIn'>
        <div className='flex justify-between ml-5 mr-5'>
          <h1 className='text-xl font-bold md:text-4xl text-blue-800 hover:text-orange-500 transition duration-300 transform hover:scale-105'>Subjects And Courses</h1>
          <p className='text-xl md:text-2xl text-blue-800'>{getCurrentDate()}</p> 
        </div>
        <div className='border-[1px] p-4 bg-[#0199c7] flex justify-between w-full mt-4 rounded-3xl shadow-2xl'>
          <div className='flex flex-col gap-2 mt-7 animate-slideUp'>
            <h1 className='text-white font-bold text-3xl hover:text-orange-500 transition duration-300 transform hover:scale-105'>{user.name}</h1>
            <p className='text-white font-semibold max-w-md break-words'>
              You have learned <span className='text-orange-600'>70% of your</span> goal this week! Keep it up and improve your result.
            </p>
          </div>
          <img
            src={"https://media.istockphoto.com/id/1491415561/vector/the-concept-of-learning-and-analysis-businesswoman-with-magnifying-glass-on-stack-of-books.jpg?s=612x612&w=0&k=20&c=Rupe1sWhEifz4wOS7qlGHqT7G6-F2qI6NH2wFJgP0YY="}
            alt=""
            className='h-36 transition duration-300 transform hover:scale-110' // Image zoom effect
          />
        </div>

        {/* Display subject cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          {user.subjects?.slice(0, 2).map((subject, index) => (
            <div key={index} className='p-6 border rounded-lg shadow-lg bg-gray-100 transition duration-300 transform hover:scale-105'>
              <h2 className='text-xl font-bold text-blue-800 hover:text-orange-500 transition duration-300'>{subject}</h2>
              <p className='text-gray-600'>Explore more about {subject} and keep progressing towards your goals!</p>
              <div className='flex gap-6 mt-6'>
                <button className='p-4 rounded-lg bg-orange-500 text-white font-semibold transition duration-300 transform hover:scale-105 hover:bg-orange-600'>Notes</button>
                <button className='p-4 rounded-lg bg-orange-500 text-white font-semibold transition duration-300 transform hover:scale-105 hover:bg-orange-600'>Books</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
