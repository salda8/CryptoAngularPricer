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
export class SocialStatsComponent implements OnInit, AfterViewInit {
  @Input()
  coin: string;
  redditWidget: string;
  private twitter: any;

  constructor(private router: Router, private service: CryptoPricesService, private redditApi: RedditapiService) {


  }

  ngOnInit() {
    if (this.coin) {
      this.service.getSocialStats(this.coin).subscribe(res => {
        let result: SocialStatsResponse = JSON.parse(JSON.stringify(res));
        console.log(result);

      });
      this.redditApi.getRedditWidget("ethereum", 5)
        .subscribe(res => {
          console.log("REDDIT WIDGET RES", res);
          // let result: string = res;
          let toWrite = res.substring(19, res.length - 2);
          console.log("BODY TO WRITE", toWrite);
          this.redditWidget = toWrite;


        });
    }
    else {

    }
  }

  ngAfterViewInit() {
    this.initTwitterWidget();
  }

  initTwitterWidget() {
    this.twitter = this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        (<any>window).twttr = (function (d, s, id) {
          let js: any, fjs = d.getElementsByTagName(s)[0],
            t = (<any>window).twttr || {};
          if (d.getElementById(id)) return t;
          js = d.createElement(s);
          js.id = id;
          js.src = "https://www.reddit.com/.embed?limit=5";
          fjs.parentNode.insertBefore(js, fjs);

          t._e = [];
          t.ready = function (f: any) {
            t._e.push(f);
          };

          return t;
        }(document, "script", "twitter-wjs"));

        if ((<any>window).twttr.ready())
          (<any>window).twttr.widgets.load();

      }
    });

  }
}
