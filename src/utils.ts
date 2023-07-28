import { RedditAPIError } from './errors';

export function handleRateLimit(headers: any): void {
  const remainingRequests = headers['x-ratelimit-remaining'];
  const resetTime = headers['x-ratelimit-reset'];

  if (remainingRequests === '0') {
    const resetDate = new Date(resetTime * 1000);
    const currentTime = new Date();
    const timeToReset = resetDate.getTime() - currentTime.getTime();

    throw new RedditAPIError(`Rate limit exceeded. Please wait ${timeToReset} milliseconds before making another request.`);
  }
}

export function formatError(error: any): string {
  if (error.response && error.response.data && error.response.data.error) {
    return error.response.data.error;
  }

  return 'An error occurred while making the API request.';
}
