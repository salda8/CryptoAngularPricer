import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpRequest } from "@angular/common/http";

@Injectable()
export class RedditapiService {
  private corsAnywhere: string = "https://cors-anywhere.herokuapp.com/";
  public constructor(private client: HttpClient) {}

  public getRedditWidget(subreddit: string, limit: number) {
    const url = `${
      this.corsAnywhere
    }https://www.reddit.com/r/${subreddit}.embed`;
    let request = new HttpRequest("GET", url, {
      responseType: "text",
      params: new HttpParams().set("limit", limit.toString())
    });
    return this.client.get(url, {
      responseType: "text",
      params: new HttpParams().set("limit", limit.toString())
    });
    // .subscribe(res => {
    //   console.log(res);
    // });
  }
}
