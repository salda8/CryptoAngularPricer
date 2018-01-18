import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpRequest, HttpResponse, HttpHeaderResponse, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";


@Injectable()
export class RedditapiService {
  private corsAnywhere: string = "https://cors-anywhere.herokuapp.com/";
  constructor(private client: HttpClient) { }

  getRedditWidget(subreddit: string, limit: number) {

    const url = `${this.corsAnywhere}https://www.reddit.com/r/${subreddit}.embed`;
    let request = new HttpRequest("GET", url, { responseType: "text", params: new HttpParams().set("limit", limit.toString()) });
    return this.client.get(url, { responseType: "text", params: new HttpParams().set("limit", limit.toString()) });
    // .subscribe(res => {
    //   console.log(res);
    // });

  }

}
