'use client';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/server/app';

const StudentDetail = ({ studentId }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      if (studentId) {
        const docRef = doc(db, 'students', studentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStudent(docSnap.data());
        }
      }
    };

    fetchStudent();
  }, [studentId]);

  if (!student) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-600">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6  bg-blue-50 h-full flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-between items-center p-8 rounded-lg shadow-xl w-full md:w-3/4 lg:w-1/2 bg-white border border-blue-200 mt-20">
        <div className="md:flex-1 mb-6 md:mb-0 md:mr-6">
          <h1 className="text-3xl font-bold mb-2 text-blue-900">{student.name}</h1>
          <p className="text-blue-800"><strong>Year:</strong> {student.year}</p>
          <p className="text-blue-800"><strong>Department:</strong> {student.department}</p>
          <p className="text-blue-800"><strong>Gender:</strong> Male</p>
          <p className="text-blue-800"><strong>Enrollment No.:</strong> 0207648CS968</p>
        </div>
        <div className="md:flex-1 flex justify-center">
          <img 
            src="https://tse3.mm.bing.net/th?id=OIP.F4-m_GDesbEd6wcCS8rFxQHaHO&pid=Api&P=0&h=180" 
            alt="Profile" 
            className="h-32 w-32 rounded-full object-cover mt-6 transition-transform transform hover:scale-110 shadow-md" 
          />
        </div> 
      </div>
    </div>
  );
};

export default StudentDetail;
