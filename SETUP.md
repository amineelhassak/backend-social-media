# Setup Guide

## Quick Start

### 1. Start MongoDB

Before running the application, you need to start MongoDB:

**On macOS (using Homebrew):**
```bash
# Install MongoDB if not already installed
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb/brew/mongodb-community
```

**On macOS (manual start):**
```bash
# Create data directory
mkdir -p /Users/$(whoami)/Desktop/data/db

# Start MongoDB
mongod --dbpath=/Users/$(whoami)/Desktop/data/db
```

**On Windows:**
```bash
# Start MongoDB service
net start MongoDB
```

**On Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod
```

### 2. Start the Application

Once MongoDB is running, start the application:

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### 3. Test the API

The server will start on `http://localhost:3000`

Test the health endpoint:
```bash
curl http://localhost:3000/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Social Media API is running",
  "timestamp": "2024-01-XX..."
}
```

### 4. Run Examples

You can run the example API calls:

```bash
# Make sure you have Node.js 18+ for fetch support
node examples/api-examples.js
```

## Troubleshooting

### MongoDB Connection Issues

If you see "Failed to connect to MongoDB" error:

1. **Check if MongoDB is running:**
   ```bash
   # On macOS
   brew services list | grep mongodb
   
   # On Linux
   sudo systemctl status mongod
   ```

2. **Check MongoDB port:**
   ```bash
   # Default MongoDB port is 27017
   lsof -i :27017
   ```

3. **Start MongoDB manually:**
   ```bash
   # On macOS
   mongod --dbpath=/Users/$(whoami)/Desktop/data/db
   
   # On Linux
   sudo systemctl start mongod
   ```

### Port Already in Use

If port 3000 is already in use:

1. **Find the process using port 3000:**
   ```bash
   lsof -i :3000
   ```

2. **Kill the process:**
   ```bash
   kill -9 <PID>
   ```

3. **Or change the port in server.js:**
   ```javascript
   const PORT = process.env.PORT || 3001; // Change to 3001
   ```

### Node.js Version Issues

This project requires Node.js 14 or higher. Check your version:

```bash
node --version
```

If you need to update Node.js, visit [nodejs.org](https://nodejs.org/)

## Environment Variables

You can customize the application by setting environment variables:

```bash
# Create a .env file
echo "PORT=3000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/social_media_db" >> .env
echo "NODE_ENV=development" >> .env
```

## Database Management

### Access MongoDB Shell

```bash
# Connect to MongoDB
mongosh

# Switch to the database
use social_media_db

# View collections
show collections

# View documents
db.users.find()
db.posts.find()
```

### Reset Database

To clear all data:

```bash
# In MongoDB shell
use social_media_db
db.dropDatabase()
```

Or use the API endpoints:
```bash
# Delete all users
curl -X DELETE http://localhost:3000/api/users

# Delete all posts (they will be deleted when users are deleted)
```

## Next Steps

1. **Add Authentication**: Implement JWT tokens for user authentication
2. **Add Password Hashing**: Use bcrypt to hash passwords
3. **Add Input Validation**: Use libraries like Joi or express-validator
4. **Add Rate Limiting**: Implement rate limiting for API endpoints
5. **Add CORS**: Configure CORS for frontend integration
6. **Add Testing**: Write unit and integration tests
7. **Add Logging**: Implement proper logging with Winston or similar
8. **Add Documentation**: Use Swagger/OpenAPI for API documentation

## Support

If you encounter any issues:

1. Check the console output for error messages
2. Ensure MongoDB is running and accessible
3. Verify all dependencies are installed
4. Check the README.md for detailed API documentation 