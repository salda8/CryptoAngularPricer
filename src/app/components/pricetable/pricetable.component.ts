import { Component, OnInit } from "@angular/core";

import { PriceDetails } from "../../models/pricedetailed";
import { PriceUpdateService } from "../../services/price-update.service";
import { Subscription } from "rxjs";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

import { CryptoDetailTempStorageService } from "../../services/crypto-detail-temp-storage.service";
import { CryptoPricesService } from "../../services/crypto-prices.service";
import { Ticker } from "../../models/ticker";

@Component({
  selector: "app-pricetable",
  templateUrl: "./pricetable.component.html",
  styleUrls: ["./pricetable.component.css"]
})
export class PricetableComponent implements OnDestroy, OnInit {
  public msgService: Subscription;
  public loadingIndicator: boolean;
  public offset = 0;
  public maxRows = 20;
  public filter: string = "";
  public lastFilterLength: number = 1;
  public mktDefault: number = 100000000;
  public marketCapFilter: number = 100000000;
  public listOfCoinNames: string[] = [];

  public unfilteredRows = [];
  public rows = [];

  public symbolName: { [key: string]: string } = {};

  public columns = [
    { prop: "FROMSYMBOL", name: "PAIR" },

    { prop: "PRICE" },
    { prop: "CHANGEPCT24HOUR", name: "CHANGE 24H (%)" },
    { prop: "OPEN24HOUR" },
    { prop: "HIGH24HOUR" },
    { prop: "LOW24HOUR" },
    { prop: "LASTVOLUME" },
    { prop: "LASTVOLUMETO" },

    { prop: "VOLUME24HOUR" },
    { prop: "VOLUME24HOURTO" },
    { prop: "DATEWHENRECEIVED" },
    { prop: "LASTTRADEID" },
    { prop: "MARKET" },
    { prop: "LASTMARKET" }
  ];

  public constructor(
    msgService: PriceUpdateService,
    tempStorage: CryptoDetailTempStorageService,
    private cryptoPriceService: CryptoPricesService
  ) {
    this.msgService = msgService.getMessage().subscribe(message => {
      this.addRow(message);
    });
  }
  public async ngOnInit() {
    let tickers = await this.cryptoPriceService.getAllAvailableTickers();
    (tickers as Ticker[]).map(x => {
      this.symbolName[x.symbol.toUpperCase()] = x.name;
    });
    console.log(this.symbolName);
  }

  public ngOnDestroy(): void {
    this.msgService.unsubscribe();
  }

  public clearTable() {
    this.rows = [];
    this.unfilteredRows = [];
  }

  public addRow(row: PriceDetails) {
    let rowToAdd = { ...row };
    rowToAdd.FROMSYMBOL = rowToAdd.FROMSYMBOL + "/" + rowToAdd.TOSYMBOL;
    rowToAdd.NAME = this.symbolName[row.FROMSYMBOL.toUpperCase()];
    rowToAdd.ROUTELINK = { name: rowToAdd.NAME, symbol: row.FROMSYMBOL }; // `/coin?name=${rowToAdd.NAME}&symbol=${row.FROMSYMBOL}`;

    let foundRow = this.unfilteredRows.findIndex(
      x => x.FROMSYMBOL === rowToAdd.FROMSYMBOL
    );
    if (foundRow !== -1) {
      this.unfilteredRows[foundRow] = rowToAdd;
      // this.rows[foundRow] = row;
      this.updateFilter();
    } else {
      // rowToAdd.CHANGE24HOUR = RoundPipe.prototype.transform(rowToAdd.CHANGE24HOUR, 1);
      // rowToAdd.CHANGEPCT24HOUR = RoundPipe.prototype.transform(rowToAdd.CHANGEPCT24HOUR, 2);
      this.unfilteredRows.push(rowToAdd);
      // this.tempRows = [...this.tempRows];

      setTimeout(() => {
        this.rows.push(rowToAdd);

        this.loadingIndicator = false;
        this.rows = [...this.rows];
      }, 0);
    }
  }
  public updateMktCapFilter($event) {
    let filteredArray = [];
    let filter = this.marketCapFilter;
    if (this.filter.length > 0) {
      for (let row of this.unfilteredRows) {
        if (row.FROMSYMBOL.indexOf(this.filter) >= 0 && row.MKTCAP > filter) {
          filteredArray.push(row);
        }
      }
    } else {
      for (let row of this.unfilteredRows) {
        if (row.MKTCAP > filter) {
          filteredArray.push(row);
        }
      }
    }
    console.log("FA", filteredArray);
    this.rows = [...filteredArray];
  }

  public updateFilter() {
    let filteredArray = [];
    if (this.filter.length > this.lastFilterLength) {
      for (let row of this.rows) {
        if (
          row.FROMSYMBOL.indexOf(this.filter) >= 0 &&
          row.MKTCAP > this.marketCapFilter
        ) {
          filteredArray.push(row);
        }
      }
    } else {
      for (let row of this.unfilteredRows) {
        if (
          row.FROMSYMBOL.indexOf(this.filter) >= 0 &&
          row.MKTCAP >
            (this.marketCapFilter === this.mktDefault
              ? 0
              : this.marketCapFilter)
        ) {
          filteredArray.push(row);
        }
      }
    }
    this.lastFilterLength = this.filter.length;
    console.log(filteredArray);
    setTimeout(() => {
      // update the rows
      this.rows = [...filteredArray];

      // Whenever the filter changes, always go back to the first page
      this.offset = 0;
    });
  }

  public getCellClass({ row, column, value }): any {
    if (value > 0) {
      if (value > 10) {
        return " is-big-plus";
      }
      return " is-plus";
    } else {
      if (value < -10) {
        return " is-big-minus";
      }

      return " is-minus";
    }
  }
}
