import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpParams } from "@angular/common/http";

import { GoogleTrendsApi } from "../utils/google-trends-api";

import { Subscription } from "rxjs";

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
  hostName: string = "trends.google.com";




  constructor(private http: HttpClient) {

  }

  interestByRegionTrendSearch(keyword: string) {
    let settings = {
      path: "trends/api/widgetdata/multiline",
      _id: "TIMESERIES"
    };
    console.log(settings);

    let request = new HttpRequest("GET", this.hostName + "/" + settings.path, { params: this.getParams(keyword) });
    console.log(request);
    return this.http.request(request).subscribe(res => {
      console.log(res);
      const parsedResult = this.trendsUtil.parseResults(res);
      const resultObj = parsedResult.find(({ id = "", request }) => {
        return id.indexOf(settings._id) > -1;
      });

      if (!resultObj) {
        const errObj = {
          message: "Available widgets does not contain selected api type",
          requestBody: res
        };
        throw errObj;
      }

      let req = resultObj.request;
      const token = resultObj.token;

      // req.requestOptions.category = obj.category;
      req.requestOptions.property = "";
      req = JSON.stringify(req);
      let params = this.getParams(keyword, token, req);
      let request = new HttpRequest("GET", this.hostName + "/" + settings.path, params);
      return this.http.request(request).subscribe(res => {
        console.log(res);
      });





    });



  }

  getParams(keyword: string, token?: string, req?: any): HttpParams {
    let params = new HttpParams();
    params.append("hl", keyword);
    params.append("tz", "300");

    if (token) {
      params.append("token", token);
    }

    if (req) {
      params.append("req", JSON.stringify(req));
    }
    console.log(params);
    return params;
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


