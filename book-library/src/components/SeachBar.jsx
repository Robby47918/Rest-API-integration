import { useState } from "react";
 
const SearchBar = ({ onSearch}) => {
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
    className="flex items-center justify-center gap-2 p-4 bg-gray-100  rounded-md shadow-md"
    >
        <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for title, author, or keyword..."
        className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
            Search
        </button>
    </form>
   );
};

export default SearchBar;