// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'; 

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCejbecPitWbXkRtfxUrIgirIX577aIjBs",
  authDomain: "univ-managment.firebaseapp.com",
  projectId: "univ-managment", 
  storageBucket: "univ-managment.appspot.com",
  messagingSenderId: "647397091501",
  appId: "1:647397091501:web:9d9f416b34dd3fddeefe24",
  measurementId: "G-3M5CWWX0YS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);

// Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;
export { db,getStorage };

// app/Screens/teacher/Students/StudentPage.js
// "use client"; // Ensure this is a client component
// import React, { useContext, useEffect, useState } from 'react';
// import UserContext from '../../../../context/userContext'; // Check the path
// import { query, collection, where, getDocs } from 'firebase/firestore'; // Make sure to import Firestore methods
// import { db } from '@/server/app';

// const StudentPage = () => {
//   const { user, loading } = useContext(UserContext); // This line can throw an error if context is null
//   const [students, setStudents] = useState({});

//   useEffect(() => {
//     const fetchStudents = async () => {
//       console.log("Loading state:", loading); // Check loading state
//       console.log("User object:", user); // Check user object

//       if (user && user.userType  === 'teacher') {
//         const q = query(
//           collection(db, 'students'), // Ensure db is imported and initialized
//           where('department', '==', user.department),
//           where('subjects', 'array-contains-any', user.subjects)
//         );

//         const querySnapshot = await getDocs(q);

//         const studentData = {};
//         querySnapshot.forEach((doc) => {
//           const student = doc.data();
//           const year = student.years;

//           // Organize students by year
//           if (!studentData[year]) {
//             studentData[year] = [];
//           }
//           studentData[year].push(student);
//         });

//         setStudents(studentData);
//       } else {
//         console.log("Access restricted or user role is not teacher."); // Log if access is restricted
//       }
//     };

//     fetchStudents();
//   }, [user, loading]); // Adding loading to dependencies for better handling

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <div>Please log in to view your portal.</div>;
//   }

//   return (
//     <div>
//       <h1>Student Portal</h1>
//       {user && user.userType  === 'teacher' ? (
//         <div>
//           <h2>Welcome, {user.name} (Teacher)</h2>
//           <p>Department: {user.department}</p>
//           <p>Subjects: {user.subjects?.join(', ')}</p>

//           {/* Display students categorized by year */}
//           {Object.keys(students).map((year) => (
//             <div key={year} style={{ margin: '20px 0' }}>
//               <h3>{year} Year Students</h3>
//               {students[year].length > 0 ? (
//                 <ul>
//                   {students[year].map((student, index) => (
//                     <li key={index}>
//                       <p>Name: {student.name}</p>
//                       <p>Department: {student.department}</p>
//                       <p>Subjects: {student.subjects?.join(', ')}</p>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No students in this year.</p>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Access restricted to teachers only.</p>
//       )}
//     </div>
//   );
// };

// export default StudentPage;



// {this if for fetch subjects in student collection}


// import { db } from '../../../../server/app'; // Firebase configuration
// import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

// // Subject mapping based on department and year
//    const subjectsByDepartment = {
//   "COMPUTER SCIENCE": {
//     first: ["C Programming", "Mathematics I"],
//     second: ["Data Structures", "Discrete Mathematics"],
//     third: ["Operating Systems", "Database Management Systems"],
//     fourth: ["Software Engineering", "Computer Networks"],
//   },
//   "ELECTRONICS": {
//     first: ["Basic Electronics", "Mathematics I"],
//     second: ["Digital Electronics", "Signals and Systems"],
//     third: ["Microprocessors", "Analog Circuits"],
//     fourth: ["VLSI Design", "Communication Systems"],
//   },
//   "ELECTRICAL": {
//     first: ["Basic Electrical Engineering", "Mathematics I"],
//     second: ["Electrical Machines", "Control Systems"],
//     third: ["Power Systems", "Power Electronics"],
//     fourth: ["Instrumentation", "Renewable Energy"],
//   },
// };

//   const  updateStudentSubjects = async () => {
//   const allStudents = await getDocs(collection(db, "students"));
  
//   allStudents.forEach(async (studentDoc) => {
//     const studentData = studentDoc.data();
//     const { year, department } = studentData;

//     // Check if the department is one of the specified ones
//     if (["COMPUTER SCIENCE", "ELECTRONICS", "ELECTRICAL"].includes(department)) {
//       // Check if the year exists in subjectsByDepartment for the given department
//       if (year in subjectsByDepartment[department]) {
//         const subjects = subjectsByDepartment[department][year]; // Get subjects based on department and year

//         // Update student document to add subjects
//         await updateDoc(doc(db, 'students', studentDoc.id), {
//           subjects: subjects
//         });

//         console.log(`Updated subjects for student ID: ${studentDoc.id} in ${department} Year ${year}`);
//       }
//     }
//   });
// };

// // Call the function to execute the updates
//   updateStudentSubjects().catch(console.error);

