import { Component, OnInit, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { PriceUpdateService } from "../../services/price-update.service";
import { CryptoPricesService } from "../../services/crypto-prices.service";
import { CoinSnapshot, AggregatedData, ExchangeCoinSnapshot } from "../../models/coin-snapshot";
import { NgPipesModule, RoundPipe } from "angular-pipes";
import { SortByPipePipe } from "../../pipes/sort-by-pipe.pipe";

@Component({
  selector: "app-coin-prices-on-exchanges-table",
  templateUrl: "./coin-prices-on-exchanges-table.component.html",
  styleUrls: ["./coin-prices-on-exchanges-table.component.css"]
})
export class CoinPricesOnExchangesTableComponent implements OnInit {
  @Input()
  set CoinSnapshot(value: CoinSnapshot) {
    console.log(value.Data);
    let orderedTop20 = SortByPipePipe.prototype.sortAndTakeTopX(value.Data.Exchanges, "VOLUME24HOUR", "asc", 20);

    orderedTop20.forEach((x) => {
      x.FROMSYMBOL = x.FROMSYMBOL + "/" + x.TOSYMBOL;
      let volume = Math.round(+x.VOLUME24HOUR);
      x.VOLUME24HOUR = volume;
      console.log(x.VOLUME24HOUR);
    });
    console.log(orderedTop20);
    this.coinSnapshot = value.Data.Exchanges;
    this.aggregatedData = value.Data.AggregatedData;
    this.rows = [...orderedTop20];


  }



  @Input()
  coin: string;

  aggregatedData: AggregatedData;



  msgService: Subscription;
  loadingIndicator: boolean;
  offset = 0;
  maxRows = 10;
  filter: string = "";
  lastFilterLength: number = 1;
  mktDefault: number = 100000000;
  marketCapFilter: number = 100000000;
  listOfCoinNames: string[] = [];

  unfilteredRows = [];
  rows = [

  ];

  symbolName: { [key: string]: string } = {};

  coinSnapshot: ExchangeCoinSnapshot[] = [];
  constructor() {

  }

  ngOnInit() {
  }

}
