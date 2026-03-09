const BookCard = ({ book, onSelect }) => {
    const coverUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : 'https://via.placeholder.com/150x200?text=No+Cover';
    <div
        onClick={() => onSelect(book)}
        className="bg-white shadow-md rounded p-4 hover:scale-105 transition cursor-pointer"
    >
        <img 
        src={coverUrl}
        alt={book.title}
        className="w-32 h-48 object-cover mb-2 mx-auto"
        />
        <h2 className="text-lg font-bold text-center">{book.title}</h2>
        <p className="text-sm text-gray-600 text-center">
            {book.author_name?.join(', ') || 'Unknown Author'}
        </p>
        <p className="text-sm text-gray-500 text-center">
            {book.publisher?.[0] || 'Unknown Publisher'}
        </p>
    </div>
};

export default BookCard;