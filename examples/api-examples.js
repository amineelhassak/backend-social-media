// Example API calls for the Social Media Backend
// You can run these examples using Node.js fetch or any HTTP client

const BASE_URL = 'http://localhost:3000/api';

// Example 1: Create a new user
async function createUser() {
  const userData = {
    username: 'john_doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    password: 'password123'
  };

  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const result = await response.json();
    console.log('User created:', result);
    return result.data;
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// Example 2: Create another user
async function createSecondUser() {
  const userData = {
    username: 'jane_smith',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '+0987654321',
    password: 'password456'
  };

  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const result = await response.json();
    console.log('Second user created:', result);
    return result.data;
  } catch (error) {
    console.error('Error creating second user:', error);
  }
}

// Example 3: Get all users
async function getAllUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const result = await response.json();
    console.log('All users:', result);
    return result.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Example 4: Create a post
async function createPost(authorUsername) {
  const postData = {
    content: 'Hello, this is my first post on the social media platform!',
    authorUsername: authorUsername
  };

  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
    
    const result = await response.json();
    console.log('Post created:', result);
    return result.data;
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

// Example 5: Get all posts
async function getAllPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const result = await response.json();
    console.log('All posts:', result);
    return result.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Example 6: Like a post
async function likePost(postId, username) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    });
    
    const result = await response.json();
    console.log('Post liked:', result);
    return result.data;
  } catch (error) {
    console.error('Error liking post:', error);
  }
}

// Example 7: Add a comment to a post
async function addComment(postId, username, content) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, content })
    });
    
    const result = await response.json();
    console.log('Comment added:', result);
    return result.data;
  } catch (error) {
    console.error('Error adding comment:', error);
  }
}

// Example 8: Get posts by user
async function getPostsByUser(username) {
  try {
    const response = await fetch(`${BASE_URL}/posts/user/${username}`);
    const result = await response.json();
    console.log(`Posts by ${username}:`, result);
    return result.data;
  } catch (error) {
    console.error('Error fetching user posts:', error);
  }
}

// Example 9: Update a post
async function updatePost(postId, newContent) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: newContent })
    });
    
    const result = await response.json();
    console.log('Post updated:', result);
    return result.data;
  } catch (error) {
    console.error('Error updating post:', error);
  }
}

// Example 10: Delete a post
async function deletePost(postId) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'DELETE'
    });
    
    const result = await response.json();
    console.log('Post deleted:', result);
    return result;
  } catch (error) {
    console.error('Error deleting post:', error);
  }
}

// Run all examples
async function runExamples() {
  console.log('🚀 Starting API Examples...\n');

  // Create users
  console.log('1. Creating users...');
  await createUser();
  await createSecondUser();
  
  // Get all users
  console.log('\n2. Getting all users...');
  await getAllUsers();
  
  // Create posts
  console.log('\n3. Creating posts...');
  const post1 = await createPost('john_doe');
  const post2 = await createPost('jane_smith');
  
  // Get all posts
  console.log('\n4. Getting all posts...');
  await getAllPosts();
  
  // Like posts
  console.log('\n5. Liking posts...');
  if (post1) {
    await likePost(post1._id, 'jane_smith');
    await likePost(post1._id, 'john_doe');
  }
  
  // Add comments
  console.log('\n6. Adding comments...');
  if (post1) {
    await addComment(post1._id, 'jane_smith', 'Great post, John!');
    await addComment(post1._id, 'john_doe', 'Thanks Jane!');
  }
  
  // Get posts by user
  console.log('\n7. Getting posts by user...');
  await getPostsByUser('john_doe');
  
  // Update a post
  console.log('\n8. Updating a post...');
  if (post1) {
    await updatePost(post1._id, 'Updated: Hello, this is my updated first post!');
  }
  
  // Get all posts again to see changes
  console.log('\n9. Getting all posts after updates...');
  await getAllPosts();
  
  console.log('\n✅ All examples completed!');
}

// Export functions for use in other files
module.exports = {
  createUser,
  createSecondUser,
  getAllUsers,
  createPost,
  getAllPosts,
  likePost,
  addComment,
  getPostsByUser,
  updatePost,
  deletePost,
  runExamples
};

// Run examples if this file is executed directly
if (require.main === module) {
  runExamples().catch(console.error);
} 