# 📱 Social Media Backend API

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Complete-brightgreen.svg)]()
[![Build](https://img.shields.io/badge/Build-Passing-success.svg)]()
[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)]()

<div align="center">

# 📱 Social Media Backend API

> A simple and clean social media backend API built with Node.js, Express, and MongoDB.

**Build powerful social media applications with this robust RESTful API!**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/backend-social-media?style=social)](https://github.com/yourusername/backend-social-media/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/backend-social-media?style=social)](https://github.com/yourusername/backend-social-media/network)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/backend-social-media)](https://github.com/yourusername/backend-social-media/issues)

</div>

---

## 📚 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Installation](#️-installation)
- [📚 API Documentation](#-api-documentation)
- [🗄️ Database Schema](#️-database-schema)
- [📁 Project Structure](#-project-structure)
- [🧪 Testing](#-testing)
- [🛠️ Technologies Used](#️-technologies-used)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🎯 Overview

A **RESTful social media backend API** built with Node.js, Express, and MongoDB. This project provides comprehensive user management and post functionality with social features like likes and comments. Perfect for building modern social media applications.

### 🎓 What You'll Get

- **User Management**: Complete CRUD operations for users
- **Post System**: Create, read, update, and delete posts
- **Social Features**: Like/unlike posts and add comments
- **Data Validation**: Robust input validation and error handling
- **RESTful Design**: Clean and intuitive API endpoints
- **MongoDB Integration**: NoSQL database with Mongoose ODM

## ✨ Features

### 👥 User Management
- ✅ **User Registration**: Create new user accounts
- ✅ **User Authentication**: Secure user login system
- ✅ **Profile Management**: Update user information
- ✅ **User Search**: Find users by username or ID
- ✅ **Account Deletion**: Remove user accounts

### 📝 Post System
- ✅ **Post Creation**: Create new posts with content
- ✅ **Post Management**: Edit and delete posts
- ✅ **Post Discovery**: Browse all posts or user-specific posts
- ✅ **Content Validation**: Ensure post content meets requirements

### ❤️ Social Features
- ✅ **Like System**: Like and unlike posts
- ✅ **Comment System**: Add comments to posts
- ✅ **Interaction Tracking**: Monitor user engagement
- ✅ **Social Analytics**: Track likes and comments

### 🔒 Security & Validation
- ✅ **Input Validation**: Comprehensive data validation
- ✅ **Error Handling**: Graceful error responses
- ✅ **Data Sanitization**: Clean and secure data processing
- ✅ **API Security**: Protected endpoints and validation

## 🛠️ Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

### 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/backend-social-media.git
   cd backend-social-media
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   ```bash
   # On macOS/Linux
   mongod --dbpath=/path/to/your/data/directory
   
   # On Windows
   mongod
   ```

4. **Start the server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000`

### 🔧 Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/social_media
NODE_ENV=development
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### 🔍 Health Check
```
GET /health
```

### 👥 User Endpoints

#### Get All Users
```http
GET /api/users
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "username": "john_doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get User by Username
```http
GET /api/users/:username
```

#### Get User by ID
```http
GET /api/users/id/:id
```

#### Create User
```http
POST /api/users
Content-Type: application/json

{
  "username": "john_doe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123"
}
```

#### Update User
```http
PUT /api/users/:username
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "phone": "+1234567890"
}
```

#### Delete User
```http
DELETE /api/users/:username
```

#### Delete All Users
```http
DELETE /api/users
```

### 📝 Post Endpoints

#### Get All Posts
```http
GET /api/posts
```

#### Get Post by ID
```http
GET /api/posts/:id
```

#### Create Post
```http
POST /api/posts
Content-Type: application/json

{
  "content": "This is my first post!",
  "authorUsername": "john_doe"
}
```

#### Update Post
```http
PUT /api/posts/:id
Content-Type: application/json

{
  "content": "Updated post content"
}
```

#### Delete Post
```http
DELETE /api/posts/:id
```

#### Like/Unlike Post
```http
POST /api/posts/:id/like
Content-Type: application/json

{
  "username": "john_doe"
}
```

#### Add Comment to Post
```http
POST /api/posts/:id/comments
Content-Type: application/json

{
  "username": "john_doe",
  "content": "Great post!"
}
```

#### Get Posts by User
```http
GET /api/posts/user/:username
```

## 🗄️ Database Schema

### 👤 User Model
```javascript
{
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  phone: {
    type: String,
    trim: true,
    match: /^\+?[\d\s-()]+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### 📝 Post Model
```javascript
{
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 1000
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 500
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

## 📁 Project Structure

```
backend-social-media/
├── 📁 models/
│   ├── 📄 User.js          # User data model
│   └── 📄 Post.js          # Post data model
├── 📁 routes/
│   ├── 📄 users.js         # User API routes
│   └── 📄 posts.js         # Post API routes
├── 📁 middlewares/
│   ├── 📄 auth.js          # Authentication middleware
│   ├── 📄 validation.js    # Input validation middleware
│   └── 📄 error.js         # Error handling middleware
├── 📁 utils/
│   ├── 📄 database.js      # Database connection
│   ├── 📄 validation.js    # Validation utilities
│   └── 📄 helpers.js       # Helper functions
├── 📁 config/
│   ├── 📄 database.js      # Database configuration
│   └── 📄 app.js           # Application configuration
├── 📄 server.js            # Main server file
├── 📄 package.json         # Project dependencies
├── 📄 .env                 # Environment variables
├── 📄 .gitignore           # Git ignore file
└── 📄 README.md           # Project documentation
```

## 🧪 Testing

### Manual Testing with cURL

#### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "password": "password123"
  }'
```

#### Create a Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is a test post!",
    "authorUsername": "test_user"
  }'
```

#### Like a Post
```bash
curl -X POST http://localhost:3000/api/posts/POST_ID/like \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user"
  }'
```

### 🧪 Testing Tools

You can test the API using tools like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [cURL](https://curl.se/)
- [Thunder Client](https://www.thunderclient.com/)

## 🛠️ Technologies Used

### Backend Framework
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

### Database
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongodb&logoColor=white)

### Development Tools
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### API Testing
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-4000BF?style=for-the-badge&logo=insomnia&logoColor=white)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/backend-social-media.git
   ```

2. **Create your feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

5. **Test your changes**
   ```bash
   npm test
   ```

6. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

7. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

8. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Add comprehensive tests for new features
- Update API documentation for new endpoints
- Ensure all tests pass before submitting
- Add proper error handling and validation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ and lots of ☕**

*Build powerful social media applications with this robust RESTful API!*

[![GitHub stars](https://img.shields.io/github/stars/yourusername/backend-social-media?style=social)](https://github.com/yourusername/backend-social-media/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/backend-social-media?style=social)](https://github.com/yourusername/backend-social-media/network)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/backend-social-media)](https://github.com/yourusername/backend-social-media/issues)

**Last updated: December 2024**

</div> 