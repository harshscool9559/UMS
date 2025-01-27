"use client";
import React, { useContext, useState } from "react";
import { BsBank } from "react-icons/bs";

import Profile from "../shows/Proflie";

import Welcome from "../../../app/Screens/student/Welcome";
import Cards from "../../../app/Screens/teacher/Cards/page";
import UserContext, { UserProvider } from "@/context/userContext";

const Page = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useContext(UserContext);

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className="w-full h-screen text-blue-900 relative">
      <div className="bg-blue-300 shadow-lg  p-4">
        <div className="flex w-full justify-between items-center">
          <div className="flex justify-center items-center ml-10">
            <BsBank
              className="h-16 w-12 text-black
         font-bold"
            />
            <h1 className="text-3xl font-bold tracking-wider transform transition-transform duration-300 hover:scale-110 ml-14">
             Teacher Profile
            </h1>
          </div>
          <div
            className="h-12 w-12 rounded-full cursor-pointer hover:shadow-lg"
            onClick={handleProfileToggle}
          >
            {user ? (
              <img
                src={
                  user.profileImage ||
                  "https://tse3.mm.bing.net/th?id=OIP.uqQzMWgdU6Cp8N6SgR1W1wHaHa&pid=Api&P=0&h=180"
                }
                alt="Profile"
                className="rounded-full"
              />
            ) : (
              <img
                src={
                  "https://tse3.mm.bing.net/th?id=OIP.uqQzMWgdU6Cp8N6SgR1W1wHaHa&pid=Api&P=0&h=180"
                }
                alt="Profile"
                className="rounded-full"
              />
            )}
          </div>
        </div>
      </div>

      <UserProvider>
        {isProfileOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-20 flex justify-end">
            <Profile onClose={handleProfileToggle} />
          </div>
        )}
      </UserProvider>
     
      <div
        className={`relative z-10 mt-14 ${
          isProfileOpen ? "opacity-50" : "opacity-100 "
        }`}
      >
        <Welcome />
        <UserProvider>
    <Cards />
  </UserProvider>   
 
      </div>
    </div>
  );
};

export default Page;
