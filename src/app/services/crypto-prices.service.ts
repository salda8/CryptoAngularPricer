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
import { MessageService } from "../models/message-service";
import { ContinousPriceUpdatesMessageService } from "./price-details-message.service";
import { request } from "../models/request";
import { String, StringBuilder } from "typescript-string-operations-ng4";
import { CoinListResponse } from "../models/coin-list-response";




@Injectable()
export class CryptoPricesService {
  private static coinList: Map<string, string>;

  contUpdatesService: ContinousPriceUpdatesMessageService;
  baseUrl = "https://min-api.cryptocompare.com/data/";
  parameters: Map<string, string>;

  private corsAnywhere: string = "https://cors-anywhere.herokuapp.com/";



  constructor(private http: HttpClient, private messageService: PriceUpdateService, private contMsgService: ContinousPriceUpdatesMessageService) {
    this.baseUrl = this.baseUrl;
    this.messageService = messageService;
    this.contUpdatesService = this.contMsgService;
    this.getAllCoinsOnCryptoCompare();
  }

  getCoinSnapshot(ticker: string, pairedCurrency: string = "USD") {
    const url = `${this.corsAnywhere}https://www.cryptocompare.com/api/data/coinsnapshot/?fsym=${ticker}&tsym=${pairedCurrency.replace(" ", "")}`;
    return this.http.get(url);
  }

  getAllAvailableTickers(currency = "USD") {

    const url = `https://api.coinmarketcap.com/v1/ticker/?convert=${currency}`;
    let cryptoList: Ticker[] = [];
    return this.http.get(url).toPromise();

  }


  getAllCoinsOnCryptoCompare() {
    const url = "https://min-api.cryptocompare.com/data/all/coinlist";
    this.http.get(url).subscribe(res => {
      let result: CoinListResponse = JSON.parse(JSON.stringify(res));
      let keys = result.Data;
      result.DataMap = new Map<string, string>();
      Object.keys(keys).forEach(key => {
        result.DataMap.set(keys[key].Symbol, keys[key].Id);
      });

      CryptoPricesService.coinList = result.DataMap;

    });
  }

  getSocialStats(symbol: string) {
    let id = CryptoPricesService.coinList.get(symbol);
    if (!id) {
      this.getAllCoinsOnCryptoCompare();
      this.getSocialStats(symbol);
    }
    const url = `${this.corsAnywhere}https://www.cryptocompare.com/api/data/socialstats/?id=${id}`;
    return this.http.get(url);
  }


  async getContinousPriceUpdateS(ticker: string[], pairedCurrency: string[], timeout?: 50000, startAfter?: 0) {
    while (true) {
      await this.sleep(timeout);

      this.getPriceMultiByTicker(ticker, pairedCurrency, this.contMsgService);


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

  splitToTwoRequests(ticker: string[], pairedCurrency: string[], msgService: MessageService<PriceDetails>) {
    let s = 0, i = 0;
    const max = 300;
    let newTickers: string[] = [];

    for (let o of ticker) {
      let l = o.length + 1;
      if (l + s > 300) {

        this.getPriceMultiByTicker(newTickers, pairedCurrency, msgService);
        newTickers = [];
        s = 0;

      }


      s += l;
      i++;

      newTickers.push(o);



    }

    if (newTickers.length > 0) {
      this.getPriceMultiByTicker(newTickers, pairedCurrency, msgService);
    }

    // let flat = FlattenPipe.prototype.transform(TakePipe.prototype.transform(orderbyMktCap, i));
    // let remaining = orderbyMktCap.length - i;

  }

  getPriceMultiByTicker(ticker: string[], pairedCurrency: string[], msgService: MessageService<PriceDetails> = this.messageService) {
    let joinedTickerString = String.Join(",", ticker);
    if (joinedTickerString.length > 300) {
      this.splitToTwoRequests(ticker, pairedCurrency, msgService);
    }
    else {
      const url = `${this.baseUrl}pricemultifull?fsyms=${joinedTickerString}&tsyms=${String.Join(",", pairedCurrency)}`;
      console.log(url);
      let request = this.http.get(url);
      request.subscribe(result => {
        let selectedTicker = ticker;

        let selectedCurrency = pairedCurrency;

        let detailedPrice: PriceDetailed = JSON.parse(JSON.stringify(result));

        let rawList = detailedPrice.RAW;
        let displayList = detailedPrice.DISPLAY;

        for (let i = 0; i < selectedTicker.length; i++) {
          let oneRawTicker = rawList[selectedTicker[i]];
          if (oneRawTicker) {
            for (let currency of selectedCurrency) {
              let oneRaw = oneRawTicker[currency];
              oneRaw.DATEWHENRECEIVED = new Date();

              msgService.sendMessage(oneRaw);
            }
          }
        }
      });
    }
  }


  getData(ticker: string, pairedCurrency: string) {
    const url = `${this.baseUrl}subs?fsym=${ticker}&tsyms=${pairedCurrency}`;
    let request = this.http.get(url);
    return request;
  }
}
