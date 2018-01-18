import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from "@angular/common/http";

import { GoogleTrendsApi } from "../utils/google-trends-api";

import { Subscription } from "rxjs";
import { Jsonp } from "@angular/http";
import { Welcome, TimelineData } from "../models/google-trends";
import { Options } from "selenium-webdriver/firefox";
import { Observable } from "rxjs/Observable";
import { PriceDetailed } from "../models/pricedetailed";
import "rxjs/add/operator/mergeMap";




@Injectable()
export class GoogleTrendsService {

  autoComplete: "Auto complete";
  interestByRegion: {
    path: "trends/api/widgetdata/relatedsearches",
    _id: "RELATED_QUERIES"
  };
  interestOverTime: {
    path: "trends/api/widgetdata/multiline",
    _id: "TIMESERIES"
  };
  relatedQueries: "Related queries";
  relatedTopics: {
    path: "trends/api/widgetdata/relatedsearches",
    _id: "RELATED_TOPICS"
  };
  trendsUtil: GoogleTrendsApi = new GoogleTrendsApi();

  private hostUrl: string = "http://trends.google.com/";
  private corsAnywhere: string = "https://cors-anywhere.herokuapp.com/";
  private url: string = this.corsAnywhere + this.hostUrl;





  constructor(private http: HttpClient, private jsonp: Jsonp) {

  }

  interestByRegionTrendSearch(keyword: string, category?: string) {
    if (keyword) {
      let settings = {
        path: "trends/api/widgetdata/multiline",
        _id: "TIMESERIES"
      };
      console.log(settings);

      const mOptions = {
        method: "GET",
        host: "https://trends.google.com",
        path: "trends/api/explore",
        qs: {
          hl: "en-US",
          req: JSON.stringify({
            comparisonItem: [{ "keyword": keyword, "geo": "", "time": "today+12-m" }],
            category: category ? category : 0,
            property: ""
          }),
          tz: -60
        }
      };

      let url = this.url + "trends/api/explore";
      let intiRequest = this.http.get(url, {
        params: new HttpParams().set("hl", mOptions.qs.hl).set("req", mOptions.qs.req).set("tz", "-60")

      }).flatMap(res => {
        let result: Welcome = JSON.parse(JSON.stringify(res));
        let resultObject = result.widgets[0];
        let appToken = resultObject.token;
        let req = resultObject.request;

        req.requestOptions.category = +category;
        url = this.url + settings.path;
        return this.http.get(url, {
          params: this.getParams(keyword, appToken, req)

        });
      });
      return intiRequest;
    }

    return undefined;





  }

  getParams(keyword: string, token?: string, req?: any): HttpParams {
    if (token && req) {
      return new HttpParams().set("hl", keyword).set("tz", "300").set("token", token).set("req", JSON.stringify(req));
    }

    return new HttpParams().set("hl", keyword).set("tz", "300");

    // if (token) {
    //   params.append("token", token);
    // }

    // if (req) {
    //   params.append("req", JSON.stringify(req));
    // }
    // console.log(params);
    // return params;
  }

  // return new Promise((resolve, reject) => {
  //  , (res) => {
  //     let chunk = '';

  //     res.on('data', (data) => {
  //       chunk += data;
  //     });

  //     res.on('end', () => {
  //       resolve(chunk.toString('utf8'));
  //     });
  //   });

  //   req.on('error', (e) => {
  //     reject(e);
  //   });

  //   req.end();
  // });

}


