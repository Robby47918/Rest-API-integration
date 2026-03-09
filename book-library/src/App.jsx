import { useState } from 'react'
import SearchBar from './components/SeachBar'
import BookDetails from './components/BookDetails'
import BookCard from './components/BookCard'

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      if (!res.ok) throw new Error("Failed to fetch books");

      const data = await res.json();

      if (data.docs.length === 0) {
        setError("No books found. Try a different search.");
        setBooks([]);
      } else {
        setBooks(data.docs);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className=" min-h-screen min-w-screen max-w-4xl mx-auto px-5 sm:px-10 md:px-20 lg:px-50 bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50">
      
      <h1 className="text-7xl sm:text-6xl md:text-4xl font-bold text-center mb-6 py-4 text-blue-400">Book Library</h1>

      <div className=" ">
      <SearchBar onSearch={fetchBooks} />
      </div>

      {loading && <p className="text-center text-blue-600 mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {books.map((book) => (
          <BookCard 
          key={book.key} 
          book={book} 
          onSelect={setSelectedBook} />
        ))}
      </div>

      <BookDetails 
      book={selectedBook} 
      onClose={() => 
      setSelectedBook(null)} />
      </div>

  );
}

export default App;
