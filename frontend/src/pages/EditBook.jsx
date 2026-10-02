import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { authHeader } from "../api.js";
import BookForm from "../components/BookForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function EditBook() {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  
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

  const handleUpdate = async (formData) => {
    setError("");
    try {
      await api.put(`/books/${id}`, formData, authHeader(token));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  
  if (!book) {
    return <p className="p-4">{error || "Loading..."}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Edit Book</h1>
      <BookForm
        initialData={book}
        onSubmit={handleUpdate}
        buttonText="Update Book"
        error={error}
      />
    </div>
  );
}

export default EditBook;