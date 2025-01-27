"use client";
import React, { useState } from 'react';
import { auth, db } from '../../server/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { FaClock } from 'react-icons/fa';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading spinner
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data based on userType collections
      const studentDoc = await getDoc(doc(db, 'students', user.uid));
      const teacherDoc = await getDoc(doc(db, 'teachers', user.uid));
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));

      if (studentDoc.exists()) {
        router.push('/Screens/student'); // Redirect to student screen
      } else if (teacherDoc.exists()) {
        router.push('/Screens/teacher'); // Redirect to teacher screen
      } else if (adminDoc.exists()) {
        router.push('/Screens/admin'); // Redirect to admin screen
      } else {
        setError("User type not found. Please contact support.");
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="flex items-center justify-center bg-opacity-25 bg-blue-200 rounded-lg w-full p-5 mb-10">
      {/* Full-page loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
          <div className="relative flex items-center justify-center bg-white rounded-full">
            <div className="absolute w-24 h-24 rounded-full shadow-lg animate-spinSlow transform scale-125"></div>
            <FaClock className="text-6xl text-blue-900 animate-bounce" />
            <span className="absolute text-lg font-semibold text-white mt-52">Logging in...</span>
          </div>
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-96 space-x-4 space-y-5 mb-18">
        <h1 className="text-blue-500 text-3xl font-bold text-center mt-6">Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <button
            type="submit"
            className="cursor-pointer border-[2px] text-black mt-4 bg-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
