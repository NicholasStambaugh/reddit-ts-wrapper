import axios from 'axios';
import { RedditAPIError } from './errors';

export interface RedditAuthOptions {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export class RedditAuth {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;

  constructor(options: RedditAuthOptions) {
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.redirectUri = options.redirectUri;
  }

  public getScriptOnlyAccessToken(): Promise<string> {
    const url = 'https://www.reddit.com/api/v1/access_token';
    const data = {
      grant_type: 'client_credentials',
    };
    const authHeader = this.getAuthHeader();

    return axios
      .post(url, data, { headers: { Authorization: authHeader } })
      .then((response) => response.data.access_token)
      .catch((error) => {
        throw new RedditAPIError('Failed to get access token', error.response?.status);
      });
  }

  public getAuthorizationUrl(state?: string): string {
    const url = 'https://www.reddit.com/api/v1/authorize';
    const params = {
      client_id: this.clientId,
      response_type: 'code',
      state,
      redirect_uri: this.redirectUri,
      duration: 'permanent',
      scope: 'read',
    };

    const queryString = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return `${url}?${queryString}`;
  }

  private getAuthHeader(): string {
    const credentials = `${this.clientId}:${this.clientSecret}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');
    return `Basic ${encodedCredentials}`;
  }
}
