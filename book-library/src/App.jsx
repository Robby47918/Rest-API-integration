import { useState } from 'react';
import SearchBar from './components/SeachBar';
import BookDetails from './components/BookDetails';
import BookCard from './components/BookCard';

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const [activeTab, setActiveTab] = useState("library");

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

  const addToFavorites = (book) => {
    if (!favorites.find((b) => b.key === book.key)) {
      setFavorites([...favorites, book]);
    }
  };

  const addToReadingList = (book) => {
    if (!readingList.find((b) => b.key === book.key)) {
      setReadingList([...readingList, book]);
    }
  };

  return (
    <div className="min-h-screen min-w-screen mx-auto px-5 sm:px-10 md:px-20 bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50">
      
     
      <h1 className="text-4xl sm:text-6xl md:text-7xl italic font-extrabold text-center mb-6 py-20 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
        Book Library
      </h1>

      
      <div className="flex justify-center gap-6 py-4">
        <button
          onClick={() => setActiveTab("library")}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "library" ? "bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-300/50"
        : "bg-white text-blue-600 hover:bg-blue-100"}`}
        >
          Library
        </button>
        <button
          onClick={() => setActiveTab("favorites")}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "favorites" ? "bg-gradient-to-r from-pink-400 via-red-500 to-purple-500 text-white shadow-lg shadow-pink-300/50"
        : "bg-white text-pink-600 hover:bg-pink-100"}`}

        >
          Favorites
        </button>
        <button
          onClick={() => setActiveTab("readingList")}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "readingList" ? "bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500 text-white shadow-lg shadow-purple-300/50"
        : "bg-white text-purple-600 hover:bg-purple-100"}`}
        >
          Reading List
        </button>
      </div>

      
      {activeTab === "library" && (
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-xl">
            <SearchBar onSearch={fetchBooks} />
          </div>
        </div>
      )}

      
      {loading && <p className="text-center text-blue-600 mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      
      {activeTab === "library" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {books.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              onSelect={setSelectedBook}
              onAddFavorite={() => addToFavorites(book)}
              onAddReadingList={() => addToReadingList(book)}
            />
          ))}
        </div>
      )}

      {activeTab === "favorites" && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-pink-600">My Favorites</h2>
          {favorites.length === 0 ? (
            <p className="text-gray-500">No favorites yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {favorites.map((book) => (
                <BookCard key={book.key} book={book} onSelect={setSelectedBook} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "readingList" && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">My Reading List</h2>
          {readingList.length === 0 ? (
            <p className="text-gray-500">No books in your reading list yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {readingList.map((book) => (
                <BookCard key={book.key} book={book} onSelect={setSelectedBook} />
              ))}
            </div>
          )}
        </div>
      )}

      <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}

export default App;