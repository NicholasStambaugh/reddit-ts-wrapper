import axios from 'axios';
import { RedditAPIError } from './errors';
import { PaginationOptions, PaginationResult } from './pagination';
import { Post, Comment, Subreddit } from './models';

export class RedditAPI {
  private accessToken: string | null = null;

  public setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  public async getPosts(subreddit: string, options?: PaginationOptions): Promise<PaginationResult<Post>> {
    const url = `https://www.reddit.com/r/${subreddit}/hot.json`;
    const params = {
      limit: options?.limit || 25,
      after: options?.after,
      before: options?.before,
    };

    const response = await this.makeRequest(url, params);
    const posts = response.data.data.children.map((child: any) => child.data);

    return {
      data: posts,
      after: response.data.data.after,
      before: response.data.data.before,
    };
  }

  public async postComment(postId: string, text: string): Promise<void> {
    const url = `https://www.reddit.com/api/comment`;
    const data = {
      api_type: 'json',
      thing_id: postId,
      text,
    };

    await this.makeRequest(url, data);
  }

  public async searchSubreddits(query: string): Promise<Subreddit[]> {
    const url = `https://www.reddit.com/subreddits/search.json`;
    const params = {
      q: query,
    };

    const response = await this.makeRequest(url, params);
    const subreddits = response.data.data.children.map((child: any) => child.data);

    return subreddits;
  }

  private async makeRequest(url: string, params?: any): Promise<any> {
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };

    try {
      const response = await axios.get(url, { params, headers });
      return response.data;
    } catch (error) {
      throw new RedditAPIError('Failed to make API request', error.response?.status);
    }
  }
}
import axios from 'axios';
import { RedditAuth, RedditAuthOptions } from '../auth';
import { handleRateLimit, formatError } from '../utils';
import { RedditAPIError } from '../errors';

jest.mock('axios');

describe('RedditAuth', () => {
  const clientId = 'YOUR_CLIENT_ID';
  const clientSecret = 'YOUR_CLIENT_SECRET';
  const redirectUri = 'YOUR_REDIRECT_URI';

  const authOptions: RedditAuthOptions = {
    clientId,
    clientSecret,
    redirectUri,
  };

  let redditAuth: RedditAuth;

  beforeEach(() => {
    redditAuth = new RedditAuth(authOptions);
  });

  describe('getScriptOnlyAccessToken', () => {
    it('should return the access token', async () => {
      const accessToken = 'YOUR_ACCESS_TOKEN';

      const response = {
        data: {
          access_token: accessToken,
        },
      };

      axios.post.mockResolvedValue(response);

      const result = await redditAuth.getScriptOnlyAccessToken();

      expect(result).toEqual(accessToken);
    });

    it('should throw a RedditAPIError when the request fails', async () => {
      const error = {
        response: {
          status: 500,
        },
      };

      axios.post.mockRejectedValue(error);

      await expect(redditAuth.getScriptOnlyAccessToken()).rejects.toThrow(
        new RedditAPIError('Failed to get access token', error.response?.status)
      );
    });
  });

  describe('getAuthorizationUrl', () => {
    it('should return the authorization URL', () => {
      const state = 'YOUR_STATE';

      const expectedUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${redirectUri}&duration=permanent&scope=read`;

      const result = redditAuth.getAuthorizationUrl(state);

      expect(result).toEqual(expectedUrl);
    });
  });
});
