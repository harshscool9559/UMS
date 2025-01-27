'use client';
import './page.css'
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useStudentContext } from '../../../../../context/StudentContext';
import SearchBar from '../seachbar';

const StudentPage = () => {
  const { students, isLoading, loadMoreStudents } = useStudentContext();
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [yearFilter, setYearFilter] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState([]);
  const [sortOptions, setSortOptions] = useState({
    name: false,
    year: false,
    department: false,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let filtered = students.filter(student => {
      const matchesYear = yearFilter.length === 0 || yearFilter.includes(student.year);
      const matchesDepartment = departmentFilter.length === 0 || departmentFilter.includes(student.department);
      const matchesSearch = searchTerm ? student.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      return matchesYear && matchesDepartment && matchesSearch;
    });

    if (sortOptions.name) {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOptions.year) {
      filtered = filtered.sort((a, b) => a.year.localeCompare(b.year));
    } else if (sortOptions.department) {
      filtered = filtered.sort((a, b) => a.department.localeCompare(b.department));
    }

    setFilteredStudents(filtered);
  }, [students, yearFilter, departmentFilter, searchTerm, sortOptions]);

  const handleCheckboxChange = (setter, value) => {
    setter(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleSortOption = (option) => {
    setSortOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  return (
    <div className="p-6 bg-blue-200 min-h-screen">
      <div className="container mx-auto rounded-2xl shadow-2xl bg-white mt-5 text-gray-800">
        <div className="flex justify-between p-8 border-b-2 border-gray-300">
          <h1 className="text-4xl font-bold text-center text-blue-500 mb-6 md:text-left">Student Portal</h1>
          <h2 className="text-2xl text-center md:text-right font-bold text-blue-500">
            {yearFilter.length || departmentFilter.length || searchTerm
              ? `Filtered Students (${departmentFilter.join(", ") || "All Departments"}${yearFilter.length ? `, ${yearFilter.join(", ")} Year(s)` : ""}): ${filteredStudents.length}`
              : `Total Students: ${students.length}`}
          </h2>
        </div>
        <div className="flex">
          <div className="w-full lg:w-1/4 border-r-2 border-gray-300 p-10 md:h-[900px] text-gray-800">
            <h2 className="text-3xl font-bold text-blue-500">Filters:</h2>
            <label className="block mb-2 text-[20px] font-semibold text-gray-800">Year:</label>
            {["first", "second", "third", "fourth"].map(year => (
              <div key={year} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={yearFilter.includes(year)}
                  onChange={() => handleCheckboxChange(setYearFilter, year)}
                  className="mr-2 appearance-none h-6 w-6 border-2 border-gray-900 rounded-full checked:bg-green-300 checked:border-transparent"
                />
                <span>{`${year.charAt(0).toUpperCase()}${year.slice(1)} Year`}</span>
              </div>
            ))}

            <label className="block text-[20px] font-semibold mb-2 mt-6">Department:</label>
            {["COMPUTER SCIENCE", "ELECTRONICS", "ELECTRICAL"].map(department => (
              <div key={department} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={departmentFilter.includes(department)}
                  onChange={() => handleCheckboxChange(setDepartmentFilter, department)}
                  className="mr-2 appearance-none h-6 w-6 border-2 border-gray-900 rounded-full checked:bg-green-300 checked:border-transparent"
                />
                <span>{department}</span>
              </div>
            ))}

            <label className="block text-3xl font-bold text-blue-500 mb-2 mt-4">Sort By:</label>
            {["name", "year", "department"].map(option => (
              <div key={option} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={sortOptions[option]}
                  onChange={() => toggleSortOption(option)}
                  className="mr-2 appearance-none h-6 w-6 border-2 border-gray-900 rounded-full checked:bg-green-300 checked:border-transparent"
                />
                <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-3/4 rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl p-8 overflow-hidden">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {isLoading ? (
              <p className="text-center font-semibold">Loading...</p>
            ) : (
              <div className="flex flex-wrap h-[400px] overflow-y-auto  gap-3 scrollbar">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <Link href={`/Screens/teacher/studentpage/${student.id}`} key={index}>
                      <div className="bg-blue-100 flex hover:bg-blue-200 border rounded-lg shadow-md p-4 w-[260px] h-[180px] cursor-pointer transition-transform transform hover:shadow-lg">
                        <img src={student.profileImage || "https://tse3.mm.bing.net/th?id=OIP.F4-m_GDesbEd6wcCS8rFxQHaHO&pid=Api&P=0&h=180"} alt="" className="h-20 w-20 rounded-full mt-6 hover:scale-110" />
                        <div className="ml-7">
                          <p className="font-bold text-lg">{student.name}</p>
                          <p className="font-bold">Year: <span className="font-normal">{student.year}</span></p>
                          <p className="font-bold">Department: <span className="font-normal">{student.department}</span></p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-400 font-light">No students found for the selected filters.</p>
                )}
                {/* Load More Button below the list */}
                <div className="w-full flex justify-center mt-4">
                  <button
                    onClick={loadMoreStudents}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
