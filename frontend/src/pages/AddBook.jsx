import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { authHeader } from "../api.js";
import BookForm from "../components/BookForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function AddBook() {
  const [error, setError] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    setError("");
    try {
      await api.post("/books", formData, authHeader(token));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Add Book</h1>
      <BookForm onSubmit={handleAdd} buttonText="Add Book" error={error} />
    </div>
  );
}

export default AddBook;