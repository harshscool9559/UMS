// /pages/api/updateSubjects.js

import { db } from '../server/app';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

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
  "ELECTRICAL": { 
    first: ["Basic Electrical Engineering", "Mathematics I"],
    second: ["Electrical Machines", "Control Systems"],
    third: ["Power Systems", "Power Electronics"],
    fourth: ["Instrumentation", "Renewable Energy"],
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const allStudents = await getDocs(collection(db, "students"));
    
    for (const studentDoc of allStudents.docs) {
      const studentData = studentDoc.data();
      const { year, department } = studentData;

      if (["COMPUTER SCIENCE", "ELECTRONICS", "ELECTRICAL"].includes(department)) {
        if (year in subjectsByDepartment[department]) {
          const subjects = subjectsByDepartment[department][year];
          
          await updateDoc(doc(db, 'students', studentDoc.id), {
            subjects: subjects,
          });
          
          console.log(`Updated subjects for student ID: ${studentDoc.id} in ${department} Year ${year}`);
        }
      }
    }

    res.status(200).json({ message: 'Subjects updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating subjects' });
  }
}
