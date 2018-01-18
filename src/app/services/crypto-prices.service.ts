import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { isPlatformServer } from "@angular/common";
import { APP_BASE_HREF } from "@angular/common";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Response } from "@angular/http";
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
import { Console } from "@angular/core/src/console";
import { ApplicationHttpClient } from "../http-interceptor";
import { GlobalErrorHandler } from "../global-error-handler";




@Injectable()
export class CryptoPricesService {
  private static coinList: Map<string, string> = new Map<string, string>();

  contUpdatesService: ContinousPriceUpdatesMessageService;
  baseUrl = "https://min-api.cryptocompare.com/data/";
  parameters: Map<string, string>;

  private corsAnywhere: string = "https://cors-anywhere.herokuapp.com/";



  constructor(private applicationHttpClient: ApplicationHttpClient, private messageService: PriceUpdateService, private contMsgService: ContinousPriceUpdatesMessageService,
    private http: HttpClient, private errorHandler: GlobalErrorHandler) {
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
      console.log(CryptoPricesService.coinList);

    });
  }

  public getAllCoinsOnCryptoCompareAsPromise() {

    let promise = new Promise<any>((resolve, reject) => {
      const url = "https://min-api.cryptocompare.com/data/all/coinlist";
      this.http.get(url)
        .toPromise()
        .then(
        res => { // Success
          let result: CoinListResponse = JSON.parse(JSON.stringify(res));
          let keys = result.Data;
          result.DataMap = new Map<string, string>();
          Object.keys(keys).forEach(key => {
            result.DataMap.set(keys[key].Symbol, keys[key].Id);
          });
          // console.log("CryptoPricesService.coinList was asssigned", CryptoPricesService.coinList);
          resolve(result.DataMap);
        },
        msg => { // Error
          reject(msg);
        }
        );
    });
    return promise;
  }

  async getSocialStats(symbol: string) {
    console.log(symbol);
    if (symbol) {
      let id = CryptoPricesService.coinList.get(symbol);
      console.log(id);
      if (!id) {

        await this.getAllCoinsOnCryptoCompareAsPromise().then(res => {

          if (res instanceof Map) {
            CryptoPricesService.coinList = res;

          }
          else {
            this.errorHandler.handleAndAlert(new Error("Error. Please retry later."));

          }
        });

      }
      const url = `${this.corsAnywhere}https://www.cryptocompare.com/api/data/socialstats/?id=${id}`;
      return this.http.get(url).toPromise();
    }
  }

  async getContinousPriceUpdateS(ticker: string[], pairedCurrency: string[], timeout?: 50000, startAfter?: 0) {
    while (true) {
      await this.sleep(timeout);

      this.getPriceMultiByTicker(ticker, pairedCurrency, this.contMsgService);


    }
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
