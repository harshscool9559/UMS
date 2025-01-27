"use client";
import React, { useState } from 'react';
import { auth, db } from '../../server/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [userType, setUserType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [course, setCourse] = useState('');
  const [department, setDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState(''); // Changed to single value
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]); // For teacher's subject selection
  const router = useRouter();

  const subjectsByDepartment = {
    "COMPUTER SCIENCE": {
      first: ["C Programming", "Mathematics I"],
      second: ["Data Structures", "Discrete Mathematics"],
      third: ["Operating Systems", "Database Management Systems"],
      fourth: ["Software Engineering", "Computer Networks"],
    },
    "ELECTRONICS": {
      first: ["Basic Electronics", "Mathematics I"],
      second: ["Digital Electronics", "Signals and Systems"],
      third: ["Microprocessors", "Analog Circuits"],
      fourth: ["VLSI Design", "Communication Systems"],
    },
    "CIVIL": {
      first: ["Engineering Mechanics", "Mathematics I"],
      second: ["Structural Analysis", "Fluid Mechanics"],
      third: ["Construction Management", "Soil Mechanics"],
      fourth: ["Surveying", "Environmental Engineering"],
    },
    "MECHANICAL": {
      first: ["Engineering Mechanics", "Mathematics I"],
      second: ["Thermodynamics", "Fluid Mechanics"],
      third: ["Machine Design", "Manufacturing Processes"],
      fourth: ["Heat Transfer", "Control Systems"],
    },
    "ELECTRICAL": {
      first: ["Basic Electrical Engineering", "Mathematics I"],
      second: ["Electrical Machines", "Control Systems"],
      third: ["Power Systems", "Power Electronics"],
      fourth: ["Instrumentation", "Renewable Energy"],
    },
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !password || !userType) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    if (userType === 'student' && (!course || !department || !selectedYear)) {
      setError('For students, all fields related to course, department, and year must be filled.');
      setLoading(false);
      return;
    }
    if (userType === 'teacher' && !selectedRole) {
      setError('Please select a role for the teacher.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        name,
        email,
        userType,
        department: userType === 'student' || userType === 'teacher'  ? department : '',
        role: userType === 'teacher' ? selectedRole : userType === 'admin' ? 'admin' : '',
        course: userType === 'student' ? course : '',
        year: userType === 'student' ? selectedYear : '',
        subjects: userType === 'teacher' 
          ? selectedSubjects.length > 0 ? selectedSubjects : []
          : userType === 'student' ? subjectsByDepartment[department][selectedYear] : [],
        createdAt: new Date(),
      };

      // Set document in the appropriate collection
      if (userType === 'student') {
        await setDoc(doc(db, 'students', user.uid), userData);
      } else if (userType === 'teacher') {
        await setDoc(doc(db, 'teachers', user.uid), userData);
      } else if (userType === 'admin') {
        await setDoc(doc(db, 'admins', user.uid), userData);
      } 

    } catch (error) {
      console.error("Signup Error:", error);
      setError(error.code === 'auth/email-already-in-use' ? 'This email is already registered. Please use a different email.' : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subject)) {
        return prev.filter((s) => s !== subject);
      } else {
        return [...prev, subject];
      }
    });
  };

  return (
    <div className="flex items-center justify-center bg-opacity-25 bg-blue-200 p-4 rounded-lg">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md max-h-96 overflow-y-scroll scrollbar">
        <h1 className="text-blue-500 text-3xl font-bold text-center">Sign Up</h1>
        <p className="text-gray-700 mt-4 text-center">Create an account by entering your details below.</p>

        <form onSubmit={handleSignup} className="mt-8 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            value={userType}
            onChange={(e) => {
              setUserType(e.target.value);
              setCourse('');
              setDepartment('');
              setSelectedYear('');
              setSelectedSubjects([]);
            }}
            className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select user type</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
            <option value="hod">HOD</option>
          </select>

          {userType === 'student' && (
            <>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Course</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="Diploma">Diploma</option>
              </select>

              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Department</option>
                <option value="COMPUTER SCIENCE">Computer Science</option>
                <option value="ELECTRONICS">Electronics</option>
                <option value="CIVIL">Civil</option>
                <option value="MECHANICAL">Mechanical</option>
                <option value="ELECTRICAL">Electrical</option>
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Year</option>
                {["first", "second", "third", "fourth"].map((year) => (
                  <option key={year} value={year}>
                    {year.charAt(0).toUpperCase() + year.slice(1)} Year
                  </option>
                ))}
              </select>
            </>
          )}
           {userType === 'hod' && (
            <select value={department} onChange={(e) => setDepartment(e.target.value)}
            className='px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            required>
              <option value="">Select Department</option>
              <option value="COMPUTER SCIENCE">Computer Science</option>
              <option value="ELECTRONICS">Electronics</option>
              <option value="ELECTRICAL">ELECTRICAL</option>
              <option value="MECHANICAL">Mechanical</option>
            </select>
          )}

          {userType === 'teacher' && (
            <>
             <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Role</option>
                <option value="HOD">HOD</option>
                <option value="Professor">Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
              </select>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Department</option>
                <option value="COMPUTER SCIENCE">Computer Science</option>
                <option value="ELECTRONICS">Electronics</option>
                <option value="CIVIL">Civil</option>
                <option value="MECHANICAL">Mechanical</option>
                <option value="ELECTRICAL">Electrical</option>
              </select>

              <div>
      <p className="font-semibold">Select Subjects:</p>
      {Object.keys(subjectsByDepartment[department] || {}).map((year) => (
        <div key={year}>
          <p className="font-medium">{year.charAt(0).toUpperCase() + year.slice(1)} Year:</p>
          {subjectsByDepartment[department][year].map((subject) => (
            <div key={subject} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedSubjects.includes(subject)}
                onChange={() => handleSubjectChange(subject)}
                className="mr-2"
              />
              <label>{subject}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg w-full bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
