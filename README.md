# Reddit API Wrapper

This is a TypeScript-based API wrapper for the Reddit API. It provides developers with a convenient and easy-to-use interface to interact with Reddit's endpoints, allowing them to retrieve data, post content, manage user accounts, and perform various other actions on Reddit programmatically.

## Installation (Not Working)

To install the Reddit API Wrapper, you can use npm:

```bash
npm install reddit-api-wrapper
```

## Usage (Working)

To use the Reddit API Wrapper in your TypeScript project, import the necessary classes and methods:

```typescript
import { RedditAPI, RedditAuth } from 'reddit-api-wrapper';

// Create a new instance of the RedditAPI class
const redditAPI = new RedditAPI();

// Authenticate with Reddit using OAuth 2.0
const auth = new RedditAuth({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URI',
});

// Get an access token using the script-only authentication flow
const accessToken = await auth.getScriptOnlyAccessToken();

// Set the access token for the RedditAPI instance
redditAPI.setAccessToken(accessToken);

// Use the RedditAPI instance to interact with Reddit's endpoints
const posts = await redditAPI.getPosts('popular');
console.log(posts);
```

## Authentication

The Reddit API Wrapper supports both script-only and user-interactive authentication flows. To authenticate with Reddit, you need to create an instance of the RedditAuth class and provide your client ID, client secret, and redirect URI. You can then use the `getScriptOnlyAccessToken` method to get an access token for script-only authentication, or use the `getAuthorizationUrl` method to get the authorization URL for user-interactive authentication.

```typescript
import { RedditAuth } from 'reddit-api-wrapper';

const auth = new RedditAuth({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URI',
});

// Script-only authentication flow
const accessToken = await auth.getScriptOnlyAccessToken();

// User-interactive authentication flow
const authorizationUrl = auth.getAuthorizationUrl();
console.log(authorizationUrl);
```

## API Methods

The Reddit API Wrapper provides methods to interact with various Reddit API endpoints. Here are some examples:

### Get Posts

```typescript
import { RedditAPI } from 'reddit-api-wrapper';

const redditAPI = new RedditAPI();

// Get posts from the "popular" subreddit
const posts = await redditAPI.getPosts('popular');
console.log(posts);
```

### Post Comment

```typescript
import { RedditAPI } from 'reddit-api-wrapper';

const redditAPI = new RedditAPI();

// Post a comment on a Reddit post
const postId = 'POST_ID';
const comment = 'This is a test comment';
await redditAPI.postComment(postId, comment);
```

### Search Subreddits

```typescript
import { RedditAPI } from 'reddit-api-wrapper';

const redditAPI = new RedditAPI();

// Search for subreddits matching a query
const query = 'programming';
const subreddits = await redditAPI.searchSubreddits(query);
console.log(subreddits);
```

## Error Handling

The Reddit API Wrapper handles errors gracefully and provides meaningful error messages. If an error occurs, an instance of the `RedditAPIError` class will be thrown with the error message and status code.

```typescript
import { RedditAPI, RedditAPIError } from 'reddit-api-wrapper';

const redditAPI = new RedditAPI();

try {
  const posts = await redditAPI.getPosts('popular');
  console.log(posts);
} catch (error) {
  if (error instanceof RedditAPIError) {
    console.error(`Error: ${error.message}`);
    console.error(`Status Code: ${error.statusCode}`);
  } else {
    console.error(error);
  }
}
```

## Pagination

Some Reddit API endpoints return large amounts of data. To handle pagination, the Reddit API Wrapper provides a `Pagination` class. You can use the `fetchNextPage` method to fetch the next page of results.

```typescript
import { RedditAPI, Pagination } from 'reddit-api-wrapper';

const redditAPI = new RedditAPI();

// Get posts from the "popular" subreddit with pagination
const pagination = new Pagination(redditAPI.getPosts.bind(redditAPI), 'popular');
const firstPage = await pagination.fetchNextPage();
console.log(firstPage);

// Fetch the next page of results
const nextPage = await pagination.fetchNextPage();
console.log(nextPage);
```

## Unit Tests

The Reddit API Wrapper includes unit tests to ensure the robustness and stability of the library. You can run the tests using the following command:

```bash
npm test
```

## Bonus Features

The Reddit API Wrapper also includes support for handling media uploads when creating posts. You can use the `uploadMedia` method to upload images, videos, or other media files.

```typescript
import { RedditAPI } from 'reddit-api-wrapper';

const redditAPI = new RedditAPI();

// Upload an image and create a post with the image
const imageFile = 'path/to/image.jpg';
const postTitle = 'My cool image';
const postContent = 'Check out this cool image!';
const post = await redditAPI.createPostWithImage(imageFile, postTitle, postContent);
console.log(post);
```

Additionally, the Reddit API Wrapper supports real-time updates using Reddit's WebSocket API. You can use the `WebSocketAPI` class to listen for new posts, comments, and other events in real-time.

```typescript
import { WebSocketAPI } from 'reddit-api-wrapper';

const webSocketAPI = new WebSocketAPI();

// Listen for new posts in the "programming" subreddit
webSocketAPI.onNewPost('programming', (post) => {
  console.log('New post:', post);
});

// Listen for new comments on a specific post
const postId = 'POST_ID';
webSocketAPI.onNewComment(postId, (comment) => {
  console.log('New comment:', comment);
});
```

## Examples

The `examples` directory contains example applications and code snippets demonstrating how to use the Reddit API Wrapper for common tasks like retrieving posts, posting comments, and searching for subreddits. You can run the examples using the following command:

```bash
npm run examples
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
