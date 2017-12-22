import { Injectable, PLATFORM_ID, Optional, RendererFactory2, ViewEncapsulation, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { isPlatformServer } from "@angular/common";
import { APP_BASE_HREF } from "@angular/common";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Icurrency } from "../models/icurrency";



@Injectable()
export class CryptoPricesService {
  baseUrl = "https://min-api.cryptocompare.com/data/";


  constructor(private http: HttpClient) {
    this.baseUrl = this.baseUrl + "price";
  }

  getPriceByTicker(ticker: string, pairedCurrency: string) {
    const url = `${this.baseUrl}?fsym=${ticker}&tsyms=${pairedCurrency.replace(" ", "")}`;
    // let parameters = new HttpParams();
    // parameters.append("fsym", ticker);
    // parameters.append("tsyms", pairedCurrency);
    // console.log(parameters.get("tsyms"), parameters.get("fsym"));
    let request = this.http.get(url);



    return request;
  }

  getPriceMultiByTicker(ticker: string, pairedCurrency: string) {
    const url = `${this.baseUrl}multifull?fsyms=${ticker}&tsyms=${pairedCurrency.replace(" ", "")}`;
    // let parameters = new HttpParams();
    console.log(url);
    // parameters.append("fsym", ticker);
    // parameters.append("tsyms", pairedCurrency);
    // console.log(parameters.get("tsyms"), parameters.get("fsym"));
    let request = this.http.get(url);



    return request;
  }
}
