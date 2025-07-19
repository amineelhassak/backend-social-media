# Social Media Backend API

A simple and clean social media backend API built with Node.js, Express, and MongoDB. This project provides user management and post functionality with likes and comments.

## 🚀 Features

- **User Management**: Create, read, update, and delete users
- **Post Management**: Create, read, update, and delete posts
- **Social Features**: Like/unlike posts and add comments
- **Data Validation**: Input validation and error handling
- **RESTful API**: Clean and intuitive API endpoints
- **MongoDB Integration**: NoSQL database with Mongoose ODM

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
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

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Health Check
```
GET /health
```

### User Endpoints

#### Get All Users
```
GET /api/users
```

#### Get User by Username
```
GET /api/users/:username
```

#### Create User
```
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
```
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
```
DELETE /api/users/:username
```

#### Delete All Users
```
DELETE /api/users
```

### Post Endpoints

#### Get All Posts
```
GET /api/posts
```

#### Get Post by ID
```
GET /api/posts/:id
```

#### Create Post
```
POST /api/posts
Content-Type: application/json

{
  "content": "This is my first post!",
  "authorUsername": "john_doe"
}
```

#### Update Post
```
PUT /api/posts/:id
Content-Type: application/json

{
  "content": "Updated post content"
}
```

#### Delete Post
```
DELETE /api/posts/:id
```

#### Like/Unlike Post
```
POST /api/posts/:id/like
Content-Type: application/json

{
  "username": "john_doe"
}
```

#### Add Comment to Post
```
POST /api/posts/:id/comments
Content-Type: application/json

{
  "username": "john_doe",
  "content": "Great post!"
}
```

#### Get Posts by User
```
GET /api/posts/user/:username
```

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  phone: String,
  password: String (required),
  posts: [ObjectId] (references to Post),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  content: String (required),
  author: ObjectId (required, references User),
  likes: [ObjectId] (references to User),
  comments: [{
    user: ObjectId (references User),
    content: String (required),
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Project Structure

```
backend-social-media/
├── models/
│   ├── User.js          # User data model
│   └── Post.js          # Post data model
├── routes/
│   ├── users.js         # User API routes
│   └── posts.js         # Post API routes
├── server.js            # Main server file
├── package.json         # Project dependencies
└── README.md           # Project documentation
```

## 🧪 Testing the API

You can test the API using tools like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [cURL](https://curl.se/)

### Example cURL Commands

#### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Create a Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello, world!",
    "authorUsername": "test_user"
  }'
```

#### Get All Posts
```bash
curl http://localhost:3000/api/posts
```

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## 🔒 Security Considerations

- Passwords are stored in plain text (for demo purposes only)
- No authentication middleware implemented
- No rate limiting
- No input sanitization

**For production use, consider implementing:**
- Password hashing (bcrypt)
- JWT authentication
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Environment variables for sensitive data

## 🛠️ Development

### Adding New Features

1. Create new models in the `models/` directory
2. Add routes in the `routes/` directory
3. Update `server.js` to include new routes
4. Test your endpoints

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/social_media_db
NODE_ENV=development
```

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please open an issue on the repository.

---

**Happy coding! 🎉** 