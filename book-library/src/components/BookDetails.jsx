import {use, useEffect, useState} from 'react';

const BookDetails = ({ book, onClose }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!book) return;
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://openlibrary.org${book.key}.json`);
                const data = await res.json();
                setDetails(data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [book]);

    if (!book) return null;
    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-500"
                >
                &times;
                </button>

                {loading ? (
                <p className="text-center text-gray-600">Loading details...</p>
                ) : (
               <>

                <img
                src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'https://via.placeholder.com/200x300?text=No+Cover'}
                alt={book.title}
                className="w-40 h-60 object-cover mb-4 mx-auto"
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
                </>
                )}
        </div>
    </div>
    );
};

export default BookDetails;
