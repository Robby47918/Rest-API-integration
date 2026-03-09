import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return; 
    onSearch(query);          
    setQuery("");              
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center justify-center gap-3 
                 p-4 bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 
                 rounded-lg shadow-lg"
    >
     
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for title, author, or keyword..."
        className="flex-1 w-full md:w-2/3 px-4 py-2 px-4 border border-gray-300 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-pink-500 
                   text-gray-800"
      />

     
      <button
        type="submit"
        className="w-50 md:w-auto px-6 py-2 bg-pink-600 text-black font-semibold 
                   rounded-md hover:bg-pink-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;