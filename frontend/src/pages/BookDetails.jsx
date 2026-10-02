import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api.js";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
      } catch (err) {
        setError("Book not found");
      }
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return <p className="p-4">{error || "Loading..."}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded shadow">
      {book.image ? (
        <img src={book.image} alt={book.title} className="w-full max-h-96 object-cover rounded" />
      ) : (
        <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500 rounded">
          No Image
        </div>
      )}

      <h1 className="text-3xl font-bold mt-4">{book.title}</h1>
      <p className="text-gray-600">by {book.author}</p>
      <p className="text-sm text-gray-500 mt-1">Category: {book.category}</p>
      <p className="text-xl font-semibold mt-2">${book.price}</p>
      <p className="mt-4">{book.description}</p>

      <Link to="/" className="inline-block mt-6 text-blue-600">
        ← Back to books
      </Link>
    </div>
  );
}

export default BookDetails;