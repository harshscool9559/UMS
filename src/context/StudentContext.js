"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { query, collection, getDocs, limit, startAfter } from 'firebase/firestore';
import { db } from '@/server/app';

const StudentContext = createContext();

export const useStudentContext = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null); // To track the last document loaded
  const [hasMore, setHasMore] = useState(true); // To check if there are more students to load

  const fetchStudents = async () => {
    try {
      let q = query(collection(db, 'students'), limit(20)); // Fetching only 20 students at a time
      if (lastVisible) {
        q = query(q, startAfter(lastVisible)); // Fetch next set of students
      }

      const querySnapshot = await getDocs(q);
      const fetchedStudents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setStudents(prevStudents => [...prevStudents, ...fetchedStudents]); // Append new students to existing ones
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]); // Update last visible document
      setHasMore(querySnapshot.docs.length === 20); // Check if there are more students to load
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setIsLoading(false);
    }
  };

  // Initial fetch when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to load more students
  const loadMoreStudents = () => {
    if (hasMore) {
      fetchStudents();
    }
  };

  return (
    <StudentContext.Provider value={{ students, isLoading, loadMoreStudents }}>
      {children}
    </StudentContext.Provider>
  );
};
