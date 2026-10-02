import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function BookCard({ book, onDelete }) {
  const { user } = useAuth();

  // Show Edit/Delete only if the logged-in user created this book
  const isOwner = user && user.id === book.createdBy;

  return (
    <div className="bg-white rounded shadow overflow-hidden flex flex-col">
      {book.image ? (
        <img src={book.image} alt={book.title} className="h-56 w-full object-cover" />
      ) : (
        <div className="h-56 bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      <div className="p-4 flex flex-col gap-1 flex-1">
        <h2 className="text-lg font-bold">{book.title}</h2>
        <p className="text-gray-600">by {book.author}</p>
        <p className="text-sm text-gray-500">{book.category}</p>
        <p className="font-semibold">${book.price}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            to={`/books/${book._id}`}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            View Details
          </Link>

          {isOwner && (
            <>
              <Link
                to={`/edit-book/${book._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(book._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookCard;