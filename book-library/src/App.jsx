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
            activeTab === "library" ? "bg-blue-500 text-gray-600" : "bg-white text-blue-600"
          }`}
        >
          Library
        </button>
        <button
          onClick={() => setActiveTab("favorites")}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "favorites" ? "bg-blue-500 text-gray-600" : "bg-white text-blue-600"
          }`}
        >
          Favorites
        </button>
        <button
          onClick={() => setActiveTab("readingList")}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "readingList" ? "bg-blue-500 text-gray-600" : "bg-white text-blue-600"
          }`}
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