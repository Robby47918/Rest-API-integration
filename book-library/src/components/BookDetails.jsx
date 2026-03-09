const BookDetails = ({ book, onClose }) => {
    if (!book) return null;
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-500"
                >
                &times;
                </button>

                <img
                src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'https://via.placeholder.com/200x300?text=No+Cover'}
                alt={book.title}
                className="w-48 h-72 object-cover mb-4 mx-auto"
                />
                <h2 className="text-2xl font-bold mb-2 text-center">{book.title}</h2>
                <p className="text-center text-gray-700 mb-4">{book.author_name?.join(', ') || 'Unknown Author'}</p>
                <p className="text-center text-gray-500">{book.publisher?.[0] || 'Unknown Publisher'}</p>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p><strong>First Published:</strong> {book.first_publish_year || "N/A"}</p>
                <p><strong>ISBN:</strong> {book.isbn?.[0] || "N/A"}</p>
                <p><strong>Pages:</strong> {book.number_of_pages_median || "N/A"}</p>
                <p><strong>Subjects:</strong> {book.subject?.slice(0, 5).join(", ") || "N/A"}</p>
        </div>
        </div>
    </div>
};

export default BookDetails;
