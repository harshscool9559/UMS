import UserContext from '@/context/userContext';
import React, { useContext, useEffect, useState } from 'react';


const Welcome = () => {
  const [textVisible, setTextVisible] = useState(false);
const {user,loading}  =useContext(UserContext);
  useEffect(() => {
    setTextVisible(true);
  }, []);

  return (
    <div className='flex justify-between mr-10'>
    <div className="mt-6 ml-6 w-1/2 overflow-hidden">
      <h1 className="md:text-7xl text-3xl mt-4 ml-5 font-bold">
        {/* Gradient effect for "Welcome" */}
        <span
          className={`inline-block mt-38  pt-10 bg-gradient-to-r from-pink-400 via-blue-500 to-purple-400 bg-clip-text text-transparent ${
            textVisible ? 'animate-fadeIn delay-[100ms]' : 'opacity-0'
          }`}
        >
          Welcome,
        </span>{' '}
        
        {/* Purple color for "Sanskrati" with a staggered delay */}
        <span
          className={`inline-block text-blue-800 ${
            textVisible ? 'animate-fadeIn delay-[300ms]' : 'opacity-0'
          }`}
        >
       {user ? (
        <>
          
            {user.name || "N/A"}
          
          
        </>
      ) : (
        <p className="text-red-500">User data not available.</p>
      )}
        </span>{' '}
        
        
      </h1>
      <p
        className={`mt-4 ml-5 text-blue-900 text-lg font-light transition-opacity duration-1000 ${
          textVisible ? 'opacity-100 delay-[800ms]' : 'opacity-0'
        }`}
      >
        You can explore Your Profile
      </p>
    
    </div>
    <img 
    src="https://img.freepik.com/premium-vector/college-students-university-education-concept-people-illustration_169479-534.jpg?w=2000" 
    alt="" 
    className="h-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
  />
    </div>
  );
};

export default Welcome;
