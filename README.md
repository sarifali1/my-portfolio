# MERN Portfolio Website 🌐

A full-stack **MERN (MongoDB, Express, React, Node.js)** portfolio website with an **Admin Dashboard**, **JWT Authentication**, and **Contact Management System**.  
The project is fully deployed with real production URLs.

---

## 🔗 Live Demo

- **Frontend (Netlify):** [https://your-frontend-url.netlify.app](https://sarifali.netlify.app/)  
- **Backend API (Render):** https://portfolio-backend-jotx.onrender.com  
- **GitHub Repository:** https://github.com/sarifali1/my-portfolio  

---

## ✨ Features

### 🌍 Frontend
- Modern responsive portfolio UI
- Dark / Light mode
- Projects, Skills, Education, Contact sections
- Admin Login page
- Protected Admin Dashboard
- Axios API integration

### 🔐 Authentication
- Admin login using **JWT**
- Protected routes
- Secure token-based access

### 📩 Contact System
- Contact form for visitors
- Messages stored in MongoDB
- Admin can view & delete messages

### 🛠 Backend
- RESTful API with Express
- MongoDB Atlas database
- JWT-based authentication
- Centralized error handling
- Secure environment variables

---

## 🧑‍💻 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT
- bcryptjs

**Deployment**
- Frontend → Netlify
- Backend → Render
- Database → MongoDB Atlas

---

## 📁 Project Structure

mern-portfolio/
│
├── frontend/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/ # Express backend
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── server.js
│ └── package.json
│
└── .gitignore

---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder:

PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=production

> ⚠️ Never push `.env` files to GitHub.

---

## 🚀 Run Locally

### 1️⃣ Clone Repository
```bash
git clone https://github.com/sarifali1/my-portfolio.git
cd my-portfolio
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
npm run dev
3️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
🧪 Admin Access
Admin authentication is protected using JWT

Admin can view and manage contact messages

Admin creation route is disabled in production for security

📌 Status
✅ Fully functional
✅ Deployed to production
✅ Real-world MERN stack project

👨‍💻 Author
MD Sarif Ali

GitHub: https://github.com/sarifali1

📄 License
This project is for learning and portfolio purposes.
