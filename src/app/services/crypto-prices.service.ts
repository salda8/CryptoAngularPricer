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
import { Ticker } from "../models/ticker";




@Injectable()
export class CryptoPricesService {
  baseUrl = "https://min-api.cryptocompare.com/data/";


  constructor(private http: HttpClient, private messageService: PriceUpdateService) {
    this.baseUrl = this.baseUrl;
    this.messageService = messageService;
  }

  getAllAvailableTickers(currency = "USD") {

    const url = `https://api.coinmarketcap.com/v1/ticker/?convert=${currency}`;
    return this.http.get(url);

  }

  getAllCoinsOnCryptoCompare() {
    const url = "https://min-api.cryptocompare.com/data/all/coinlist"
    return this.http.get(url);
  }


  callbackToPromise(method, ...args) {
    return new Promise(function (resolve, reject) {
      return method(...args, function (err, result) {
        return err ? reject(err) : resolve(result);
      });
    });
  }

  async getContinousPriceUpdateS(ticker: string, pairedCurrency: string, timeout?: 50000, startAfter?: 0) {
    while (true) {

      const howlong = this.timer();
      console.log("Trying to sleep for 10 seconds");
      // const source = timer(startAfter, timeout);
      await this.sleep(5000);

      this.getPriceMultiByTicker(ticker, pairedCurrency).subscribe(message => {
        let detailedPrice: PriceDetailed = JSON.parse(JSON.stringify(message));
        let display = detailedPrice.DISPLAY[ticker];
        let raw = detailedPrice.RAW[ticker];
        console.log("RAW", raw);

        raw = raw[pairedCurrency];
        let xx: PriceDetails = raw;
        xx.FROMSYMBOL = display[pairedCurrency].FROMSYMBOL;
        xx.TOSYMBOL = display[pairedCurrency].TOSYMBOL;
        xx.PRICE = raw.PRICE;
        xx.DATEWHENRECEIVED = new Date();
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
