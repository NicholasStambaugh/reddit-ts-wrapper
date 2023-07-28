export interface Post {
  id: string;
  title: string;
  author: string;
  created_utc: number;
  score: number;
  num_comments: number;
  permalink: string;
}

export interface Comment {
  id: string;
  author: string;
  created_utc: number;
  body: string;
  permalink: string;
}

export interface Subreddit {
  id: string;
  name: string;
  display_name: string;
  subscribers: number;
  description: string;
}
