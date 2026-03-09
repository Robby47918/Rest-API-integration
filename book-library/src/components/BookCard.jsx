const BookCard = ({ book, onSelect, onAddFavorite, onAddReadingList }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <div
      className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 
                 shadow-lg rounded-lg p-4 
                 hover:scale-105 hover:shadow-xl transition 
                 flex flex-col items-center"
    >
      
      <img
        src={coverUrl}
        alt={book.title}
        className="w-24 h-36 sm:w-28 sm:h-40 md:w-32 md:h-48 object-cover mb-3 rounded"
      />

     
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-center text-blue-800">
        {book.title}
      </h2>

      
      <p className="text-xs sm:text-sm md:text-base text-gray-700 text-center">
        {book.author_name?.join(", ") || "Unknown Author"}
      </p>

      
      <p className="text-xs sm:text-sm md:text-base text-gray-500 text-center mb-3">
        {book.publisher?.[0] || "Unknown Publisher"}
      </p>

      
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        <button
          onClick={() => onSelect(book)}
          className="px-3 py-1 bg-blue-500 text-blue rounded-md hover:bg-blue-600"
        >
          Details
        </button>

        <button
          onClick={() => onAddFavorite(book)}
          className="px-3 py-1 bg-pink-500 text-blue rounded-md hover:bg-pink-600"
        >
        Favorite
        </button>

        <button
          onClick={() => onAddReadingList(book)}
          className="px-3 py-1 bg-purple-500 text-blue rounded-md hover:bg-purple-600"
        >
          Reading List
        </button>
      </div>
    </div>
  );
};

export default BookCard;