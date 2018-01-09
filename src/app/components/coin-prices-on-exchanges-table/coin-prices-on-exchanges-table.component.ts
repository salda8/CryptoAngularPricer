import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-coin-prices-on-exchanges-table",
  templateUrl: "./coin-prices-on-exchanges-table.component.html",
  styleUrls: ["./coin-prices-on-exchanges-table.component.css"]
})
export class CoinPricesOnExchangesTableComponent implements OnInit {
  msgService: Subscription;
  loadingIndicator: boolean;
  offset = 0;
  maxRows = 20;
  filter: string = "";
  lastFilterLength: number = 1;
  mktDefault: number = 100000000;
  marketCapFilter: number = 100000000;
  listOfCoinNames: string[] = [];

  unfilteredRows = [];
  rows = [

  ];

  symbolName: { [key: string]: string } = {};


  constructor() { }

  ngOnInit() {
  }

}
