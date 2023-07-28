import { RedditAPIError } from '../errors';

describe('RedditAPIError', () => {
  it('should create an instance of RedditAPIError with the correct properties', () => {
    const message = 'An error occurred';
    const statusCode = 500;

    const error = new RedditAPIError(message, statusCode);

    expect(error.message).toBe(message);
    expect(error.statusCode).toBe(statusCode);
    expect(error.name).toBe('RedditAPIError');
  });
});
