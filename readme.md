# 🚀 Realtime Social Post & Chatting Application

A **Realtime RESTful API + WebSocket backend** built with **Node.js, Express, MongoDB, and Socket.io**.  
This application provides **user authentication, social post & comment system, and realtime private/public chat** functionality.  

---

## ✨ Features
- 🔑 **JWT Authentication** (Login/Register with refresh token support)  
- 👤 **User Management** (CRUD operations)  
- 💬 **Realtime Chat System** (Socket.io)  
- 📝 **Post & Comment System** (Like, comment, delete, update)  
- 🔔 **Realtime Notifications** (new message, new comment, new like)  
- 📖 **API Documentation** with Swagger  

---

## 🛠 Tech Stack
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (Mongoose)  
- **Auth:** JWT (Access + Refresh Tokens)  
- **Realtime:** Socket.io  
- **Tools:** Swagger, Postman  

---

## 📂 Project Structure

src/
┣ modules/
┃ ┣ routes.ts # API routes
┃ ┣ controllers/ # Handle incoming requests
┃ ┣ services/ # Business logic
┃ ┣ models/ # Database schemas/entities
┣ middlewares/ # Authentication & custom middleware
┣ utils/ # Helper functions
┗ index.ts # App entry point


---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/AbdulMalek-swe/social-post-chat-app.git

# Go into the project folder
cd social-post-chat-app

# Install dependencies
npm install

🔑 Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/
NODE_ENV=development
ACCESS_TOKEN_SECRET=youraccesstokensecret
REFRESH_TOKEN_SECRET=yourrefreshtokensecret

▶️ Running the Project

# Development
npm run dev

# Production
npm run start

📌 API Endpoints
🔐 Auth

    POST /api/auth/register → Register new user

    POST /api/auth/login → Login and get tokens

    POST /api/auth/refresh → Refresh access token

👤 Users

    GET /api/users → Get all users

    GET /api/users/:id → Get user by ID

    PUT /api/users/:id → Update user profile

    DELETE /api/users/:id → Delete user

📝 Posts

    GET /api/posts → Get all posts

    POST /api/posts → Create new post

    PUT /api/posts/:id → Update post

    DELETE /api/posts/:id → Delete post

💬 Comments

    POST /api/posts/:id/comments → Add comment to post

    GET /api/posts/:id/comments → Get all comments on a post

    DELETE /api/posts/:id/comments/:commentId → Delete comment

❤️ Likes

    POST /api/posts/:id/like → Like a post

    POST /api/posts/:id/unlike → Unlike a post

💬 Realtime Chat (Socket.io)

    connect → User connects with socket ID

    join_room → Join a chat room (private/public)

    send_message → Send message to room/user

    receive_message → Receive message in realtime

    disconnect → User disconnects

📌 Example Request

Login Request:

curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "123456"}'

Response:

{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR..."
}

🧪 Testing

# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

📖 API Documentation

Swagger UI is available at:

http://localhost:5000/api/docs

Or import the Postman Collection from:

docs/postman_collection.json

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Please open an issue or submit a pull request.
📜 License

This project is licensed under the MIT License.


---

⚡ This version is **customized exactly for your project** (Social posts + Realtime Chatting + JWT + MongoDB + Socket.io).  

👉 Do you also want me to **add Socket.io event examples** (like `join_room`, `send_message`, `typing`) into the README.md so developers can test chat features easily?

