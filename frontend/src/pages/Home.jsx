import { useEffect, useState } from "react";
import api, { authHeader } from "../api.js";
import BookCard from "../components/BookCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Home() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuth();

  // Runs once when the page loads
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        setBooks(response.data);
      } catch (err) {
        setError("Could not load books");
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    try {
      await api.delete(`/books/${id}`, authHeader(token));
      // Remove the deleted book from the list on screen
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Could not delete book");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Books</h1>

      {error && <p className="text-red-600">{error}</p>}
      {books.length === 0 && !error && <p>No books yet.</p>}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book._id} book={book} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default Home;