# 📚 Book API – Express.js Server

A simple RESTful API built with **Express** and **MongoDB (Mongoose)** to manage a collection of books.

---

## 🚀 Deployment

This server is live at:

```
https://book-store-server-jdev.onrender.com/
```

> Replace with your actual deployment URL.

---

## 📦 Features

- ✅ Add new books
- 📝 Update existing books
- 🔍 Get all or specific books
- ❌ Delete books
- 🔒 Input validation for safe data handling

---

## 🧭 API Endpoints

### 📥 Create a Book

- **POST** `/books`
- **Body**:

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "price": 10.99,
  "publishedDate": "1988-05-01"
}
```

---

### 📖 Get All Books

- **GET** `/books`

---

### 🔍 Get a Book by ID

- **GET** `/books/:id`

---

### 🛠️ Update a Book by ID

- **PUT** `/books/:id`
- **Body (partial or full):**

```json
{
  "title": "The Midnight Library",
  "author": "Matt Haig",
  "price": 14.25,
  "publishedDate": "2020-09-29"
}
```

---

### ❌ Delete a Book by ID

- **DELETE** `/books/:id`

---

## 🛡 Input Validation

- Title and Author must be strings
- Price must be a number
- `publishedDate` must be a valid date

Invalid input will return a `400 Bad Request`.

---

## ⚙️ Tech Stack

- Node.js
- Express
- MongoDB (via Mongoose)
- Postman (for API testing)

---

## 🧪 Example Seed Data (JSON)

You can use this data for testing POST routes:

```json
[
  {
    "title": "Atomic Habits",
    "author": "James Clear",
    "price": 16.0,
    "publishedDate": "2018-10-16"
  },
  {
    "title": "The Midnight Library",
    "author": "Matt Haig",
    "price": 14.25,
    "publishedDate": "2020-09-29"
  }
]
```

---

## 🏁 Getting Started Locally

```bash
git clone https://github.com/simpl1fy/book_store_server.git
cd book-api
npm install
npm start
```

Ensure MongoDB is running locally or update your connection string in `.env`.

---

## 👨‍💻 Author

Developed by **Gourab Das**
