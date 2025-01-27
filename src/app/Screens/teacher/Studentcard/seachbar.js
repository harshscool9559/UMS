// SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search by student name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border-2 text-gray-800 font-light border-gray-400 rounded-full text-[20px] px-3 py-3 w-full mb-4 bg-white"
    />
  );
};

export default SearchBar;
