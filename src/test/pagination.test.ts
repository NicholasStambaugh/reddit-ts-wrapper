import { RedditAPI } from '../api';
import { handleRateLimit } from '../utils';

describe('Pagination', () => {
  let redditAPI: RedditAPI;

  beforeEach(() => {
    redditAPI = new RedditAPI();
  });

  describe('getPosts', () => {
    test('should fetch posts with pagination', async () => {
      const subreddit = 'programming';
      const limit = 10;
      const after = 't3_abcdefg';

      const mockResponse = {
        data: {
          children: [
            { data: { id: '1', title: 'Post 1' } },
            { data: { id: '2', title: 'Post 2' } },
            { data: { id: '3', title: 'Post 3' } },
          ],
          after: 't3_hijklmn',
        },
      };

      const mockFetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
        headers: {
          get: jest.fn().mockReturnValue('10'),
        },
      });

      global.fetch = mockFetch;

      const posts = await redditAPI.getPosts(subreddit, limit, after);

      expect(posts).toEqual([
        { id: '1', title: 'Post 1' },
        { id: '2', title: 'Post 2' },
        { id: '3', title: 'Post 3' },
      ]);

      expect(mockFetch).toHaveBeenCalledWith(
        `https://www.reddit.com/r/${subreddit}/new.json?limit=${limit}&after=${after}`,
        {
          headers: {
            Authorization: `Bearer ${redditAPI.getAccessToken()}`,
          },
        }
      );
    });

    test('should handle rate limit', async () => {
      const subreddit = 'programming';
      const limit = 10;
      const after = 't3_abcdefg';

      const mockResponse = {
        data: {
          children: [
            { data: { id: '1', title: 'Post 1' } },
            { data: { id: '2', title: 'Post 2' } },
            { data: { id: '3', title: 'Post 3' } },
          ],
          after: 't3_hijklmn',
        },
      };

      const mockFetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
        headers: {
          get: jest.fn().mockReturnValue('0'),
        },
      });

      global.fetch = mockFetch;

      await expect(redditAPI.getPosts(subreddit, limit, after)).rejects.toThrowError(
        'Rate limit exceeded. Please try again later.'
      );

      expect(mockFetch).toHaveBeenCalledWith(
        `https://www.reddit.com/r/${subreddit}/new.json?limit=${limit}&after=${after}`,
        {
          headers: {
            Authorization: `Bearer ${redditAPI.getAccessToken()}`,
          },
        }
      );
    });
  });
});
