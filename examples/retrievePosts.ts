import { RedditAPI, RedditAuth } from '../src';

// Create an instance of the RedditAPI
const redditAPI = new RedditAPI();

// Set the access token obtained through authentication
redditAPI.setAccessToken('YOUR_ACCESS_TOKEN');

// Retrieve posts from a subreddit
async function retrievePosts() {
  try {
    const subreddit = 'programming';
    const options = {
      limit: 10,
      after: 't3_abc123',
      before: 't3_xyz789',
    };

    const result = await redditAPI.getPosts(subreddit, options);

    console.log('Posts:');
    result.data.forEach((post) => {
      console.log(`- Title: ${post.title}`);
      console.log(`  Author: ${post.author}`);
      console.log(`  Score: ${post.score}`);
      console.log(`  Comments: ${post.num_comments}`);
      console.log(`  Permalink: https://www.reddit.com${post.permalink}`);
      console.log('------------------------');
    });

    console.log('After:', result.after);
    console.log('Before:', result.before);
  } catch (error) {
    console.error('Error retrieving posts:', error.message);
  }
}

retrievePosts();
