# BookStore

A simple Book Store web app built with the MERN stack (MongoDB, Express, React, Node) with JWT authentication and full CRUD for books.

## Features
- Register, login, logout (JWT stored in localStorage)
- View all books and book details (public)
- Add, edit, delete books (logged-in users only)
- Users can only edit/delete their own books
- Protected frontend routes

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, React Router DOM, Axios
- Backend: Node.js, Express, MongoDB Atlas, Mongoose, JWT, bcryptjs (ES Modules)

## Folder Structure
```
bookstore/
├── backend/
│   ├── controllers/   (authController.js, bookController.js)
│   ├── middleware/    (authMiddleware.js)
│   ├── models/        (User.js, Book.js)
│   ├── routes/        (authRoutes.js, bookRoutes.js)
│   ├── server.js
│   └── .env
└── frontend/
    └── src/
        ├── components/ (Navbar, BookCard, BookForm, ProtectedRoute)
        ├── pages/      (Home, Login, Register, AddBook, EditBook, BookDetails)
        ├── context/    (AuthContext.jsx)
        ├── api.js
        ├── App.jsx
        └── main.jsx
```

## Installation
```bash
git clone <your-repo-url>
cd bookstore/backend && npm install
cd ../frontend && npm install
```

## Environment Variables

backend/.env
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

frontend/.env
```
VITE_API_URL=http://localhost:5000/api
```

## Run Backend
```bash
cd backend
npm run dev
```

## Run Frontend
```bash
cd frontend
npm run dev
```
Open http://localhost:5173

## API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/auth/register | Public | Register a user |
| POST | /api/auth/login | Public | Login, returns JWT |
| GET | /api/books | Public | Get all books |
| GET | /api/books/:id | Public | Get one book |
| POST | /api/books | Private | Create a book |
| PUT | /api/books/:id | Private (owner) | Update a book |
| DELETE | /api/books/:id | Private (owner) | Delete a book |

## Authentication Flow
1. Register: password is hashed with bcryptjs and saved.
2. Login: password is compared, a JWT containing the user id is returned.
3. The frontend stores the token in localStorage.
4. Protected requests send `Authorization: Bearer <token>`.
5. The backend middleware verifies the token and sets `req.userId`.
6. Controllers compare `book.createdBy` with `req.userId` for ownership.
