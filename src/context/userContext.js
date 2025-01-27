// context/userContext.js
"use client"
import React, { createContext, useEffect, useState, useContext } from 'react';
import { auth, db } from '../server/app';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState( null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const studentDoc = await getDoc(doc(db, 'students', currentUser.uid));
          const teacherDoc = await getDoc(doc(db, 'teachers', currentUser.uid));
          const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));

          if (studentDoc.exists()) {
            setUser({ uid: currentUser.uid, ...studentDoc.data() });
          } else if (teacherDoc.exists()) {
            setUser({ uid: currentUser.uid, ...teacherDoc.data() });
          } else if (adminDoc.exists()) {
            setUser({ uid: currentUser.uid, ...adminDoc.data() });
          } else {
            setUser(null); // No document found
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null); // Set user to null on error
        }
      } else {
        setUser(null); // No user is logged in
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading ,setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export default UserContext;
