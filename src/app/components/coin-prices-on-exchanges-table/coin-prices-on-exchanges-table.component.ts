import { Component, OnInit, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { PriceUpdateService } from "../../services/price-update.service";
import { CryptoPricesService } from "../../services/crypto-prices.service";
import { CoinSnapshot, AggregatedData, ExchangeCoinSnapshot, ViewExchangeCoinSnapshot } from "../../models/coin-snapshot";
import { NgPipesModule, RoundPipe, WherePipe } from "angular-pipes";
import { SortByPipePipe } from "../../pipes/sort-by-pipe.pipe";
import { countDecimals, round } from "../../utils/dataOperations";

@Component({
  selector: "app-coin-prices-on-exchanges-table",
  templateUrl: "./coin-prices-on-exchanges-table.component.html",
  styleUrls: ["./coin-prices-on-exchanges-table.component.css"]
})
export class CoinPricesOnExchangesTableComponent implements OnInit {
  totalPriceInTop20: number = 0;
  averagePriceInTop: number = 0;
  totalDecimals: number = 0;

  @Input()
  set CoinSnapshot(value: CoinSnapshot) {
    // console.log(value.Data);

    let orderedTop20: ViewExchangeCoinSnapshot[] = SortByPipePipe.prototype.sortAndTakeTopX(value.Data.Exchanges.map(x => new ViewExchangeCoinSnapshot(x)), "VOLUME24HOUR", "asc", 20);
    let filteredZeroVolume: ViewExchangeCoinSnapshot[] = this.volumeBiggerThanX(orderedTop20);
    let filteredCount = filteredZeroVolume.length;
    filteredZeroVolume.forEach(x => this.countPercentChangeAgainstAveragePrice(x, filteredCount));
    console.log(filteredZeroVolume);
    this.coinSnapshot = value.Data.Exchanges;
    this.aggregatedData = value.Data.AggregatedData;
    this.rows = [...filteredZeroVolume];
    this.loadingIndicator = false;



  }





  @Input()
  coin: string;
  exchangeWithHighestPrice: string = "";
  lowestPrice: number;
  highestPrice: number;
  exchangeWithLowestPrice: string = "";
  biggestPriceDifference: number = 0;

  aggregatedData: AggregatedData;



  msgService: Subscription;
  loadingIndicator: boolean = true;
  offset = 0;
  maxRows = 10;
  filter: string = "";
  lastFilterLength: number = 1;
  mktDefault: number = 100000000;
  marketCapFilter: number = 100000000;
  listOfCoinNames: string[] = [];

  unfilteredRows = [];
  rows: ViewExchangeCoinSnapshot[] = [

  ];

  symbolName: { [key: string]: string } = {};

  coinSnapshot: ExchangeCoinSnapshot[] = [];
  constructor() {

  }

  ngOnInit() {
  }

  countPercentChangeAgainstAveragePrice(x: ViewExchangeCoinSnapshot, filteredCount: number) {

    this.averagePriceInTop = this.totalPriceInTop20 / filteredCount;
    console.log("AVERAGE", this.averagePriceInTop);
    let averageNumberOfDecimals: number = round(this.totalDecimals / filteredCount, 0);
    console.log(averageNumberOfDecimals);
    x.PRICE = round(x.PRICE, averageNumberOfDecimals);
    // console.log(1 - (+this.averagePriceInTop / +x.PRICE));
    let numbertoRound = (1 - (this.averagePriceInTop / x.PRICE));
    x.DIFTOAVERAGEPRICE = round(round(numbertoRound, 3) * 100, 1);
    if (x.DIFTOAVERAGEPRICE > this.highestPrice) {
      this.exchangeWithHighestPrice = x.MARKET;
      this.highestPrice = x.DIFTOAVERAGEPRICE;
      this.biggestPriceDifference = round((this.highestPrice + -this.lowestPrice), 1);
    }
    else if (x.DIFTOAVERAGEPRICE < this.lowestPrice) {
      this.exchangeWithLowestPrice = x.MARKET;
      this.lowestPrice = x.DIFTOAVERAGEPRICE;
      this.biggestPriceDifference = round((this.highestPrice + -this.lowestPrice), 1);
    }
    else {
      this.lowestPrice = x.DIFTOAVERAGEPRICE;
      this.highestPrice = x.DIFTOAVERAGEPRICE;
    }
  }

  volumeBiggerThanX(item: ViewExchangeCoinSnapshot[], x: number = 100): ViewExchangeCoinSnapshot[] {
    let arrayToReturn: ViewExchangeCoinSnapshot[] = [];
    for (let snap of item) {
      if (snap.VOLUME24HOUR > x) {
        snap.VOLUME24HOUR = Math.round(+snap.VOLUME24HOUR);

        this.totalDecimals += countDecimals(snap.PRICE);
        arrayToReturn.push(snap);
        this.totalPriceInTop20 += +snap.PRICE;
      }
    }

    return arrayToReturn;
  }

}
