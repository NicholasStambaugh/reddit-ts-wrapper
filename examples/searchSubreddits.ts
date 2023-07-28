import { RedditAPI } from '../api';

async function searchSubreddits(query: string): Promise<void> {
  const redditAPI = new RedditAPI();
  // Set the access token here if needed
  // redditAPI.setAccessToken('your-access-token');

  try {
    const subreddits = await redditAPI.searchSubreddits(query);
    console.log(subreddits);
  } catch (error) {
    console.error(error);
  }
}

searchSubreddits('programming');

