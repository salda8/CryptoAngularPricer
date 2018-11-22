export interface General {
  Name: string;
  CoinName: string;
  Type: string;
  Points: number;
}

export interface SimilarItem {
  Id: number;
  Name: string;
  FullName: string;
  ImageUrl: string;
  Url: string;
  FollowingType: number;
}

export interface CryptopianFollower {
  Id: number;
  Name: string;
  ImageUrl: string;
  Url: string;
  Type: string;
}

export interface PageViewsSplit {
  Overview: number;
  Markets: number;
  Analysis: number;
  Charts: number;
  Trades: number;
  Orderbook: number;
  Forum: number;
  Influence: number;
}

export interface CryptoCompare {
  SimilarItems: SimilarItem[];
  CryptopianFollowers: CryptopianFollower[];
  Points: number;
  Followers: number;
  Posts: string;
  Comments: string;
  PageViewsSplit: PageViewsSplit;
  PageViews: number;
}

export interface Twitter {
  following: string;
  account_creation: string;
  name: string;
  lists: number;
  statuses: number;
  favourites: string;
  followers: number;
  link: string;
  Points: number;
}

export interface Reddit {
  posts_per_hour: string;
  comments_per_hour: string;
  posts_per_day: string;
  comments_per_day: number;
  name: string;
  link: string;
  active_users: number;
  community_creation: string;
  subscribers: number;
  Points: number;
}

export interface Facebook {
  likes: number;
  link: string;
  is_closed: string;
  talking_about: string;
  name: string;
  Points: number;
}

export interface Parent {
  Name: string;
  Url: string;
  InternalId: number;
}

export interface Source {
  Name: string;
  Url: string;
  InternalId: number;
}

export interface List {
  created_at: string;
  open_total_issues: string;
  parent: Parent;
  size: string;
  closed_total_issues: string;
  stars: number;
  last_update: string;
  forks: number;
  url: string;
  closed_issues: string;
  closed_pull_issues: string;
  fork: string;
  last_push: string;
  source: Source;
  open_pull_issues: string;
  language: string;
  subscribers: number;
  open_issues: string;
}

export interface CodeRepository {
  List: List[];
  Points: number;
}

export interface Data {
  General: General;
  CryptoCompare: CryptoCompare;
  Twitter: Twitter;
  Reddit: Reddit;
  Facebook: Facebook;
  CodeRepository: CodeRepository;
}

export interface SocialStatsResponse {
  Response: string;
  Message: string;
  Type: number;
  Data: Data;
}
