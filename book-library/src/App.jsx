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
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-center py-8">Book Library</h1>

      <SearchBar onSearch={fetchBooks} />

      {loading && <p className="text-center text-blue-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
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
