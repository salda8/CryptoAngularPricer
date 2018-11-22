import { Component, OnInit } from "@angular/core";

import { Subscription } from "rxjs";
import {
  GraphLine,
  PriceDetails,
  GraphSeries
} from "../../models/pricedetailed";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { String } from "typescript-string-operations-ng4";

import { MatSelectChange } from "@angular/material";
import { FormControl } from "@angular/forms";

import { PriceUpdateService } from "../../services/price-update.service";
import { ContinousPriceUpdatesMessageService } from "../../services/price-details-message.service";

@Component({
  selector: "app-pricegraph",
  templateUrl: "./pricegraph.component.html",
  styleUrls: ["./pricegraph.component.css"]
})
export class PricegraphComponent implements OnInit, OnDestroy {
  msgService: Subscription;
  liveUpdatesMessageService: Subscription;
  selectedCryptoPair: string[] = [];
  single: any[];
  multi: GraphLine[] = [];
  allReceivedPriceDetails: PriceDetails[] = [];
  multipleSelectedMultiSeries: string[] = [];
  allReceivedPairs: string[] = [];

  view: any[] = [700, 400];
  pairsToPlotControl: FormControl = new FormControl();
  valuesToPlotControl: FormControl = new FormControl();
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Date";
  showYAxisLabel = true;
  yAxisLabel = "Price";
  create = false;

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  possibleValuesToPlot = [
    "PRICE",
    "LASTVOLUME",
    "LASTVOLUMETO",
    "VOLUME24HOUR",
    "VOLUME24HOURTO",
    "OPEN24HOUR",
    "HIGH24HOUR",
    "LOW24HOUR",
    "LASTMARKET",
    "CHANGE24HOUR",
    "CHANGEPCT24HOUR"
  ];

  selecetedValuesToPlot: string[] = [this.possibleValuesToPlot[0]];
  // line, area
  autoScale = true;
  constructor(
    msgService: PriceUpdateService,
    liveUpdatesService: ContinousPriceUpdatesMessageService
  ) {
    this.liveUpdatesMessageService = liveUpdatesService
      .getMessage()
      .subscribe(message => {
        this.proccessReceivedMessage(message);
      });
    this.msgService = msgService.getMessage().subscribe(message => {
      this.proccessReceivedMessage(message);
    });
  }

  proccessReceivedMessage(message: PriceDetails) {
    // console.log("RECEIVED MESSAGE: " + JSON.stringify(message));
    this.allReceivedPriceDetails.push(message);
    let seriesName = String.Join("/", message.FROMSYMBOL, message.TOSYMBOL);
    if (!this.allReceivedPairs.find(x => x === seriesName)) {
      this.allReceivedPairs.push(seriesName);
    }
    if (this.multi.length === 0) {
      this.selectedCryptoPair.push(seriesName);
      for (let value of this.selecetedValuesToPlot) {
        let graphLine = this.createNewGraphLine(seriesName, message, value);
        this.pushAndLogGraphLine(graphLine);
        this.create = true;
      }
    } else {
      let multiFound = this.multi.find(x => x.name === seriesName);
      if (multiFound !== undefined) {
        this.pushPointToExistingGraphSeries(multiFound, message);
      }
    }
  }

  pushAndLogGraphLine(graphLine: GraphLine) {
    this.multi.push(graphLine);
  }

  createNewGraphLine(
    seriesName: string,
    priceDetails: PriceDetails,
    value: string
  ): GraphLine {
    let series: GraphSeries[] = [];
    this.yAxisLabel = value;
    series.push(
      new GraphSeries(priceDetails.DATEWHENRECEIVED, priceDetails[value])
    );
    return new GraphLine(seriesName, series);
  }

  pushPointToExistingGraphSeries(
    graphLine: GraphLine,
    priceDetails: PriceDetails
  ) {
    for (let value of this.selecetedValuesToPlot) {
      graphLine.series.push(
        new GraphSeries(priceDetails.DATEWHENRECEIVED, priceDetails[value])
      );
    }

    this.multi = [...this.multi];
  }

  ngOnDestroy(): void {
    this.msgService.unsubscribe();
  }

  onBtnClick() {
    /// this.multi.push(new PriceChange("21", 777.90, "CryptoCompare Index"));
    // this.multi.push(new PriceChange("22", 800.90, "CryptoCompare Index"));
    // this.single = single;
    // this.multi = multi;
    // Object.assign(this, { single, multi });
    this.create = true;
  }
  onValuesToPlotSelectionChange(event: MatSelectChange) {
    this.changeGraph();
  }

  onPairsToPlotSelectionChange(event: MatSelectChange) {
    this.changeGraph();
  }

  changeGraph() {
    this.multi = [];
    for (let pair of this.selectedCryptoPair) {
      for (let value of this.selecetedValuesToPlot) {
        this.pushAndLogGraphLine(
          this.filterAllReceivedPriceDetails(pair, value)
        );
      }
    }
  }

  filterAllReceivedPriceDetails(pair: string, valueToPlot: string): GraphLine {
    // let seriesName = String.Join("/", message.FROMSYMBOL, message.TOSYMBOL);
    let currenciesInPair = pair.split("/");
    let fileteredPriceDetails = this.allReceivedPriceDetails.filter(
      x =>
        x.FROMSYMBOL === currenciesInPair[0] &&
        x.TOSYMBOL === currenciesInPair[1]
    );
    console.log("Filtered price Details:", fileteredPriceDetails);
    let series: GraphSeries[] = [];

    for (let pd of fileteredPriceDetails) {
      series.push(new GraphSeries(pd.DATEWHENRECEIVED, pd[valueToPlot]));
    }

    let graphLine = new GraphLine(pair, series);
    return graphLine;
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {}
}
