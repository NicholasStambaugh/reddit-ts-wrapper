import { handleRateLimit, formatError } from '../utils';
import { RedditAPIError } from '../errors';

describe('Utils', () => {
  describe('handleRateLimit', () => {
    test('should throw RedditAPIError when remaining requests is 0', () => {
      const headers = {
        'x-ratelimit-remaining': '0',
        'x-ratelimit-reset': '1631234567',
      };

      expect(() => handleRateLimit(headers)).toThrow(RedditAPIError);
    });

    test('should not throw RedditAPIError when remaining requests is greater than 0', () => {
      const headers = {
        'x-ratelimit-remaining': '10',
        'x-ratelimit-reset': '1631234567',
      };

      expect(() => handleRateLimit(headers)).not.toThrow(RedditAPIError);
    });
  });

  describe('formatError', () => {
    test('should return the error message from the API response', () => {
      const error = {
        response: {
          data: {
            error: 'Invalid access token',
          },
        },
      };

      expect(formatError(error)).toBe('Invalid access token');
    });

    test('should return a default error message when no error message is available', () => {
      const error = {};

      expect(formatError(error)).toBe('An error occurred while making the API request.');
    });
  });
});
