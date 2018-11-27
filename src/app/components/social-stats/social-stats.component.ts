import { Component, OnInit, Input } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import postscribe from "postscribe";
import { CryptoPricesService } from "../../services/crypto-prices.service";
import { SocialStatsResponse } from "../../models/social-stat";
import { RedditapiService } from "../../services/redditapi.service";
import { AfterViewInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
  selector: "app-social-stats",
  templateUrl: "./social-stats.component.html",
  styleUrls: ["./social-stats.component.css"]
})
export class SocialStatsComponent implements OnInit {
  @Input()
  public coin: string;
  public redditWidget: string;
  private twitter: any;

  public constructor(private router: Router, private service: CryptoPricesService, private redditApi: RedditapiService) {

  }

  public ngOnInit() {
    if (this.coin) {
      this.service.getSocialStats(this.coin).then(res => {
        let result: SocialStatsResponse = JSON.parse(JSON.stringify(res));
        console.log(result);

      });
      this.redditApi.getRedditWidget("ethereum", 5)
        .subscribe(res => {
          // let result: string = res;
          this.redditWidget = res.substring(19, res.length - 2);

        });
    } else {

    }
  }

}
