import axios from "axios";

// One Axios instance with the backend URL, so we don't repeat it everywhere
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Builds the header that protected requests need
export const authHeader = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export default api;