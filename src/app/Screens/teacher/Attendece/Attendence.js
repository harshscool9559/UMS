"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../../../server/app";
import { collection, getDocs, addDoc, query, where, doc, getDoc } from "firebase/firestore";
import { useUserContext } from "../../../../context/userContext";
import { FaClock } from "react-icons/fa"
import "./attendence.css"

const Attendance = () => {
  const { user, loading } = useUserContext();
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // { studentId: { present: true/false } }
  const [date] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); // For showing details on click

  useEffect(() => {
    const fetchTeacherData = async () => {
      if (user && user.userType === "teacher") {
        try {
          const teacherDoc = await getDoc(doc(db, "teachers", user.uid));
          if (teacherDoc.exists()) {
            const teacherData = teacherDoc.data();
            const departmentArray = Array.isArray(teacherData.department) ? teacherData.department : [teacherData.department];
            setDepartments(departmentArray);
            setSubjects(Array.isArray(teacherData.subjects) ? teacherData.subjects : []);
          } else {
            console.error("No teacher data found");
          }
        } catch (error) {
          console.error("Error fetching teacher data:", error);
        }
      }
    };

    fetchTeacherData();
  }, [user]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedDepartment && year && subject && user && user.userType === "teacher") {
        try {
          const q = query(
            collection(db, "students"),
            where("department", "==", selectedDepartment),
            where("year", "==", year),
            where("subjects", "array-contains", subject)
          );
          const querySnapshot = await getDocs(q);
          const studentList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setStudents(studentList);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
    };

    fetchStudents();
  }, [selectedDepartment, year, subject, user]);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      if (user && user.userType === "teacher") {
        try {
          const q = query(collection(db, "attendance"), where("teacherId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const records = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setAttendanceRecords(records);
        } catch (error) {
          console.error("Error fetching attendance records:", error);
        }
      }
    };

    fetchAttendanceRecords();
  }, [user]);

  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        present: isPresent,
        absent: !isPresent, // Mark as absent if not present
      },
    }));
  };

  const submitAttendance = async () => {
    const finalAttendance = {};
    students.forEach((student) => {
      finalAttendance[student.id] = {
        present: attendance[student.id]?.present || false,
        name: student.name,
      };
    });

    try {
      await addDoc(collection(db, "attendance"), {
        teacherId: user.uid,
        department: selectedDepartment,
        year,
        subject,
        date,
        records: finalAttendance,
      });

      alert("Attendance recorded successfully");
      setAttendance({});
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Failed to record attendance");
    }
  };

  const groupedRecords = attendanceRecords.reduce((acc, record) => {
    const key = `${record.subject}-${record.year}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(record);
    return acc;
  }, {});

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
  };

  const getTotalCounts = (record) => {
    const presentStudents = [];
    const absentStudents = [];
    Object.values(record.records).forEach((rec) => {
      if (rec.present) {
        presentStudents.push(rec.name);
      } else {
        absentStudents.push(rec.name);
      }
    });
    return { presentCount: presentStudents.length, absentCount: absentStudents.length, presentStudents, absentStudents };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen  ">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 rounded-full  shadow-lg animate-spinSlow transform scale-125"></div>
        <FaClock className="text-6xl text-blue-900 animate-bounce" />
        <span className="absolute text-lg font-semibold text-white mt-52">
          Loading Attendance...
        </span>
      </div>
    </div>
    )
  }

  return (
    <div className="flex  flex-col items-center p-20   shadow-md bg-gradient-to-r from-blue-400 via-blue-900 to-blue-400 rounded-xl ">
      <div className=" w-full flex flex-col items-center just  p-6 shadow-2xl rounded-3xl bg-white">
        <div className=" border-[2px] w-full flex items-center justify-center shadow-lg bg-blue-800 rounded-3xl ">
      <h2 className="text-4xl md:text-6xl font-bold text-white p-3 ">Take Attendance</h2></div>
      {user && user.userType === "teacher" ? (
        <>
          {/* Form to select department, year, and subject */}
          <div className="flex w-full justify-between gap-9">
          <div className="flex flex-col mt-9 md:mt-20 w-full md:pl-10">
          <div className="mb-4 w-full ">
            <label className=" mb-2 block text-blue-950">Department:</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="p-3  border rounded-full w-full border-blue-800  text-blue-950 md:w-[400px]"
            >
              <option value="" >Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="mb-4 w-full">
            <label className="block mb-2 text-blue-950">Year:</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="p-3 border rounded-full w-full md:w-[400px] border-blue-800 text-blue-950 pr-24"
            >
              <option value="">Select Year</option>
              <option value="first">1st Year</option>
              <option value="second">2nd Year</option>
              <option value="third">3rd Year</option>
              <option value="fourth">4th Year</option>
            </select>
          </div>

          <div className="mb-4 w-full">
            <label className="block mb-2 text-blue-950">Subject:</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="p-3 border rounded-full w-full md:w-[400px] border-blue-800 text-blue-950 pr-16"
            >
              <option value="">Select Subject</option>
              {subjects.map((subj, index) => (
                <option key={index} value={subj}>{subj}</option>
              ))}
            </select>
          </div>
          </div>
          <img src={"https://static.vecteezy.com/system/resources/previews/011/880/757/original/time-and-attendance-tracking-sistem-flat-style-illustration-free-vector.jpg"} alt="" className="h-80 w-80 md:h-[400px] md:w-[450px] md:mt-6 md:pr-10" />
          </div>

          {/* Student List */}
          <div className="w-full mb-4">
            <h3 className="text-lg font-semibold mb-2 text-blue-950">Student List</h3>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {students.length > 0 ? (
                students.map((student) => (
                  <div key={student.id} className="min-w-[200px] flex-shrink-0 p-4 rounded-lg shadow-md bg-purple-100">
                    <div>
                      <p className="font-semibold text-blue-950">{student.name}</p>
                      <label className="inline-flex items-center mt-2">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
                          checked={attendance[student.id]?.present || false}
                        />
                        <span className="ml-2 text-blue-950">Present</span>
                      </label>
                      <label className="inline-flex items-center mt-2 ml-4">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-950"
                          onChange={(e) => handleAttendanceChange(student.id, !e.target.checked)}
                          checked={!attendance[student.id]?.present}
                        />
                        <span className="ml-2  text-blue-950">Absent</span>
                      </label>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-blue-950">No students found for this class.</p>
              )}
            </div>
          </div>

          <button
            onClick={submitAttendance}
            className="mb-4 p-2 bg-orange-500 text-white rounded"
          >
            Submit Attendance
          </button>

          {/* Attendance Records */}
           <h3 className="text-lg text-blue-950 font-semibold mt-6">Attendance Records</h3>
          <div className="w-full mt-4 ">
            {Object.entries(groupedRecords).map(([key, records], index) => (
              <div key={index} className="p-4 mb-4 bg-orange-100 rounded-lg shadow-xl">
                <h4 className=" mb-2 text-blue-950 font-bold">{key.replace("-", " - ")}</h4>
                <div className="flex flex-wrap gap-4">
                  {records.map((record) => (
                    <div
                      key={record.id}
                      className="p-3 bg-white rounded-lg shadow-xl cursor-pointer"
                      onClick={() => handleRecordClick(record)}
                    >
                      <p className="font-semibold text-blue-950">Date: {record.date}</p>
                      <p className="text-sm text-gray-500">{record.subject}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Attendance Record Modal */}
          {selectedRecord && (
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-blue-950 p-5 sm:p-8 md:p-10 lg:p-12 xl:p-16">
         <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mt-10 mb-10 overflow-y-auto max-h-[90vh]">
           <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">Attendance Record</h3>
           <p className="mb-2">Date: {selectedRecord.date}</p>
           <p className="mb-2">Subject: {selectedRecord.subject}</p>
           <p className="mb-2">Year: {selectedRecord.year}</p>
           <p className="mb-2">Department: {selectedRecord.department}</p>
           <p className="mb-2">Teacher ID: {selectedRecord.teacherId}</p>
           <div className="mb-2">
             {getTotalCounts(selectedRecord).presentCount} Present, {getTotalCounts(selectedRecord).absentCount} Absent
           </div>
           <h4 className="font-semibold">Present Students:</h4>
           <ul className="list-disc list-inside mb-2">
             {getTotalCounts(selectedRecord).presentStudents.map((name, index) => (
               <li key={index}>{name}</li>
             ))}
           </ul>
           <h4 className="font-semibold">Absent Students:</h4>
           <ul className="list-disc list-inside">
             {getTotalCounts(selectedRecord).absentStudents.map((name, index) => (
               <li key={index}>{name}</li>
             ))}
           </ul>
           <button className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => setSelectedRecord(null)}>
             Close
           </button>
         </div>
       </div>
       
          )}
        </>
      ) : (
        <p>You do not have permission to access this page.</p>
      )}
      </div>
    </div>
  );
};

export default Attendance;
