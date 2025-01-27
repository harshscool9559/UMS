"use client"
import Login from "./dashboard/login";
import Signup from "./dashboard/signup";
import { useState } from "react";
import backgimg from "../../public/assets/backgr.jpg";
import Image from "next/image";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-black bg-opacity-15 flex items-center justify-center">
   
      <div className="flex w-full mx-36 h-[600px] bg-white rounded-lg overflow-hidden shadow-lg">
     
        <div className="flex flex-col text-gray-500 items-center justify-center  w-[65%] p-2 ">
          {isLogin ? <Login /> : <Signup />}
          <div>
          <h1 className="mt-4 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 ml-2 hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </h1>
          </div>
         
        </div>

    
        <div className="relative w-[35%]">
          <Image src={backgimg} alt="Background Image" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
}
