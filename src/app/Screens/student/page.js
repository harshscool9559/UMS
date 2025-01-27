"use client";
import React, { useContext, useState } from "react";
import { BsBank } from "react-icons/bs";



import Welcome from "./Welcome";
import Cards from "./Cards";
import UserContext from "@/context/userContext";
import Profile from "../shows/Proflie";

const Page = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useContext(UserContext);

  // Toggle Profile Modal
  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Determine user role-specific title
  const getTitleByRole = () => {
    if (user?.userType === "teacher") return "Teacher Profile";
    if (user?.userType === "student") return "Student Profile";
    if (user?.userType === "admin") return "Admin Profile";
    return "Profile";
  };

  return (
    <div className="w-full h-screen text-blue-900 relative">
      {/* Header Section */}
      <div className="bg-blue-300 shadow-lg p-4">
        <div className="flex w-full justify-between items-center">
          <div className="flex justify-center items-center ml-10">
            <BsBank className="h-16 w-12 text-black font-bold" />
            <h1 className="text-3xl font-bold tracking-wider transform transition-transform duration-300 hover:scale-110 ml-14">
              {getTitleByRole()}
            </h1>
          </div>
          <div
            className="h-12 w-12 rounded-full cursor-pointer hover:shadow-lg"
            onClick={handleProfileToggle}
          >
            <img
              src={
                user?.profileImage ||
                "https://tse3.mm.bing.net/th?id=OIP.uqQzMWgdU6Cp8N6SgR1W1wHaHa&pid=Api&P=0&h=180"
              }
              alt="Profile"
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-20 flex justify-end">
          <Profile onClose={handleProfileToggle} user={user} />
        </div>
      )}

      {/* Main Content */}
      <div className={`relative z-10 ${isProfileOpen ? "opacity-50" : "opacity-100"}`}>
        <Welcome />
        <Cards />
      </div>
    </div>
  );
};

export default Page;
