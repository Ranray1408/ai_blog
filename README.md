# AI Blog — Real-time Chat Between Admin and User

This project implements a real-time chat system between users and administrators using **WebSockets (socket.io)**.

---

## 🔧 Technologies Used

- **React + Redux** — client interface & admin panel
- **Node.js + Express + Socket.io** — backend & real-time communication
- **PostgreSQL** — database for storing chats and user sessions
- **React Admin** — admin dashboard for managing user messages

---

## 💬 Features

- Real-time two-way chat between user and admin
- Online/offline and away/back user status tracking
- Incoming message notifications for admin
- Message history fetching and display
- Admin dashboard for handling multiple chat sessions

---

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ranray1408/ai_blog.git
cd ai_blog

2. Start the client
cd client
npm install
npm start

3. Start the server
cd server
npm install
node index.js
