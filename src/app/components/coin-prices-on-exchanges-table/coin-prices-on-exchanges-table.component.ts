import { Component, OnInit, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { PriceUpdateService } from "../../services/price-update.service";
import { CryptoPricesService } from "../../services/crypto-prices.service";
import {
  CoinSnapshot,
  AggregatedData,
  ExchangeCoinSnapshot,
  ViewExchangeCoinSnapshot
} from "../../models/coin-snapshot";
import { NgPipesModule, RoundPipe, WherePipe } from "angular-pipes";
import { SortByPipePipe } from "../../pipes/sort-by-pipe.pipe";
import { countDecimals, round, median } from "../../utils/dataOperations";
import { FormControl } from "@angular/forms";
import { VolumeFilter } from "../../models/volume-filter";

@Component({
  selector: "app-coin-prices-on-exchanges-table",
  templateUrl: "./coin-prices-on-exchanges-table.component.html",
  styleUrls: ["./coin-prices-on-exchanges-table.component.css"]
})
export class CoinPricesOnExchangesTableComponent implements OnInit {
  public totalPriceInTop20: number = 0;
  public averagePriceInTop: number = 0;
  public totalDecimals: number = 0;
  public volumeFilterControl: FormControl = new FormControl();
  public selectedVolume: string;
  public filterableVolumeValue: VolumeFilter[];

  @Input()
  public set CoinSnapshot(value: CoinSnapshot) {
    this.coinSnapshot = value.Data.Exchanges;
    this.aggregatedData = value.Data.AggregatedData;
  }

  @Input()
  public coin: string;
  public max: ViewExchangeCoinSnapshot;
  public min: ViewExchangeCoinSnapshot;
  public biggestPriceDifference: number = 0;

  public aggregatedData: AggregatedData;
  public msgService: Subscription;
  public loadingIndicator: boolean = true;
  public offset = 0;
  public maxRows = 10;
  public filter: string = "";
  public lastFilterLength: number = 1;
  public mktDefault: number = 100000000;
  public marketCapFilter: number = 100000000;
  public listOfCoinNames: string[] = [];

  public unfilteredRows = [];
  public rows: ViewExchangeCoinSnapshot[] = [];

  public symbolName: { [key: string]: string } = {};
  public coinSnapshot: ExchangeCoinSnapshot[];

  private partsOfMedianVolume: number = 10;

  public ngOnInit() {
    if (this.coinSnapshot) {
      this.filterAndUpdateRows();
      this.getValuesForVolumeFilter();
    }
  }

  public filterAndUpdateRows() {
    this.loadingIndicator = true;
    (this.totalDecimals = 0),
      (this.totalPriceInTop20 = 0),
      (this.averagePriceInTop = 0);

    let orderedTop20: ViewExchangeCoinSnapshot[] = SortByPipePipe.prototype.sortAndTakeTopX(
      this.coinSnapshot.map(x => new ViewExchangeCoinSnapshot(x)),
      "VOLUME24HOUR",
      "asc",
      20
    );
    let filteredZeroVolume: ViewExchangeCoinSnapshot[] = this.volumeBiggerThanX(
      orderedTop20,
      this.selectedVolume ? +this.selectedVolume : 100
    );
    console.log(filteredZeroVolume);
    let filteredCount = filteredZeroVolume.length;

    filteredZeroVolume.forEach(x =>
      this.countPercentChangeAgainstAveragePrice(x, filteredCount)
    );
    const max = filteredZeroVolume.reduce((prev, current) => {
      return prev.DIFTOAVERAGEPRICE > current.DIFTOAVERAGEPRICE
        ? prev
        : current;
    });

    const min = filteredZeroVolume.reduce((prev, current) => {
      return prev.DIFTOAVERAGEPRICE < current.DIFTOAVERAGEPRICE
        ? prev
        : current;
    });
    this.offset = 0;
    this.rows = [...filteredZeroVolume];
    this.max = max;
    this.min = min;

    this.loadingIndicator = false;
  }

  public getValuesForVolumeFilter() {
    let medianValue = median(this.rows.map(x => x.VOLUME24HOUR));
    let partOfMaxVolumeValue = medianValue / this.partsOfMedianVolume;

    let oneXofMaxVolume = Array.from(
      Array(this.partsOfMedianVolume),
      (x, index) => index + 1
    );
    console.log(partOfMaxVolumeValue, oneXofMaxVolume);
    this.filterableVolumeValue = [];
    for (let value of oneXofMaxVolume) {
      let volumeValue = Math.round(value * partOfMaxVolumeValue);
      let volumeFilter = new VolumeFilter(
        volumeValue,
        `over ${value * this.partsOfMedianVolume}% of median (${volumeValue})`
      );
      console.log(volumeFilter);
      this.filterableVolumeValue.push(volumeFilter);
    }

    console.log(this.filterableVolumeValue);
  }

  public countPercentChangeAgainstAveragePrice(
    x: ViewExchangeCoinSnapshot,
    filteredCount: number
  ) {
    this.averagePriceInTop = this.totalPriceInTop20 / filteredCount;

    let averageNumberOfDecimals: number = round(
      this.totalDecimals / filteredCount,
      0
    );

    x.PRICE = round(x.PRICE, averageNumberOfDecimals);
    // console.log(1 - (+this.averagePriceInTop / +x.PRICE));
    let numbertoRound = 1 - this.averagePriceInTop / x.PRICE;
    x.DIFTOAVERAGEPRICE = round(round(numbertoRound, 3) * 100, 1);
  }

  public volumeBiggerThanX(
    item: ViewExchangeCoinSnapshot[],
    x: number = 100
  ): ViewExchangeCoinSnapshot[] {
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

  public onVolumeFilterSelectionChange() {
    this.filterAndUpdateRows();
  }
}
