import { RedditAPI } from '../api';

// Create an instance of the RedditAPI class
const redditAPI = new RedditAPI();

// Set the access token obtained from the authentication process
redditAPI.setAccessToken('your_access_token');

// Define the post ID and comment text
const postId = 'your_post_id';
const commentText = 'This is a test comment';

// Call the postComment method to post a comment
redditAPI.postComment(postId, commentText)
  .then(() => {
    console.log('Comment posted successfully');
  })
  .catch((error) => {
    console.error('Failed to post comment:', error);
  });
