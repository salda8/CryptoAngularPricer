import { Injectable, PLATFORM_ID, Optional, RendererFactory2, ViewEncapsulation, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { isPlatformServer } from "@angular/common";
import { APP_BASE_HREF } from "@angular/common";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Icurrency } from "../models/icurrency";

import { TimerObservable } from "rxjs/observable/TimerObservable";
import { timer } from "rxjs/observable/timer";
import { PriceDetails, PriceDetailed } from "../models/pricedetailed";
import { PriceUpdateService } from "./price-update.service";




@Injectable()
export class CryptoPricesService {
  baseUrl = "https://min-api.cryptocompare.com/data/";


  constructor(private http: HttpClient, private messageService: PriceUpdateService) {
    this.baseUrl = this.baseUrl;
    this.messageService = messageService;
  }

  async getContinousPriceUpdateS(ticker: string, pairedCurrency: string, timeout?: 50000, startAfter?: 0) {
    while (true) {

      const howlong = this.timer();
      console.log("Trying to sleep for 10 seconds");
      // const source = timer(startAfter, timeout);
      await this.sleep(5000);

      this.getPriceMultiByTicker(ticker, pairedCurrency).subscribe(result => {

        let detailedPrice: PriceDetailed = JSON.parse(JSON.stringify(result));

        let xxx = detailedPrice.RAW[ticker];

        let xx: PriceDetails = xxx[pairedCurrency];

        xx.DATEWHENRECEIVED = new Date();
        console.log(xx);
        this.messageService.sendMessage(xx);



      });

      console.log("Finished sleeping:", howlong.seconds);




    }



  }

  timer() {
    const timeStart = new Date().getTime();
    return {
      /** <integer>s e.g 2s etc. */
      get seconds() {
        const seconds = Math.ceil((new Date().getTime() - timeStart) / 1000) + "s";
        return seconds;
      },
      /** Milliseconds e.g. 2000ms etc. */
      get ms() {
        const ms = (new Date().getTime() - timeStart) + "ms";
        return ms;
      }
    };
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getPriceByTicker(ticker: string, pairedCurrency: string) {
    const url = `${this.baseUrl}price?fsym=${ticker}&tsyms=${pairedCurrency.replace(" ", "")}`;
    let request = this.http.get(url);

    return request;
  }

  getPriceMultiByTicker(ticker: string, pairedCurrency: string) {
    const url = `${this.baseUrl}pricemultifull?fsyms=${ticker}&tsyms=${pairedCurrency.replace(" ", "")}`;
    console.log(url);
    let request = this.http.get(url);
    return request;
  }

  getData(ticker: string, pairedCurrency: string) {
    const url = `${this.baseUrl}subs?fsym=${ticker}&tsyms=${pairedCurrency}`;
    console.log(url);
    let request = this.http.get(url);
    return request;
  }
}
