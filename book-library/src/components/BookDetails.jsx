import { useEffect, useState } from "react";

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
      <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 
                      rounded-lg shadow-xl p-4 sm:p-6 max-w-sm sm:max-w-md md:max-w-lg w-full relative">
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-xl"
        >
          Exit
        </button>

        {loading ? (
          <p className="text-center text-blue-600">Loading details...</p>
        ) : (
          <>
           
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                  : "https://via.placeholder.com/200x300?text=No+Cover"
              }
              alt={book.title}
              className="w-32 h-48 sm:w-40 sm:h-60 object-cover mb-4 mx-auto rounded"
            />

            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-blue-900 mb-2">
              {book.title}
            </h2>

            <p className="text-center text-gray-700 mb-2 text-sm sm:text-base">
              {book.author_name?.join(", ") || "Unknown Author"}
            </p>

            <p className="text-center text-gray-500 mb-4 text-sm sm:text-base">
              {book.publisher?.[0] || "Unknown Publisher"}
            </p>

            <div className="mt-4 space-y-2 text-xs sm:text-sm md:text-base text-gray-700">
              <p>
                <strong>First Published:</strong>{" "}
                {book.first_publish_year || "N/A"}
              </p>
              <p>
                <strong>ISBN:</strong> {book.isbn?.[0] || "N/A"}
              </p>
              <p>
                <strong>Pages:</strong> {book.number_of_pages_median || "N/A"}
              </p>
              <p>
                <strong>Subjects:</strong>{" "}
                {details?.subjects?.slice(0, 5).join(", ") || "N/A"}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {details?.description?.value || details?.description || "N/A"}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetails;