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
  public msgService: Subscription;
  public liveUpdatesMessageService: Subscription;
  public selectedCryptoPair: string[] = [];
  public single: any[];
  public multi: GraphLine[] = [];
  public allReceivedPriceDetails: PriceDetails[] = [];
  public multipleSelectedMultiSeries: string[] = [];
  public allReceivedPairs: string[] = [];

  public view: any[] = [700, 400];
  public pairsToPlotControl: FormControl = new FormControl();
  public valuesToPlotControl: FormControl = new FormControl();
  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = "Date";
  public showYAxisLabel = true;
  public yAxisLabel = "Price";
  public create = false;

  public colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  public possibleValuesToPlot = [
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

  public selecetedValuesToPlot: string[] = [this.possibleValuesToPlot[0]];
  // line, area
  public autoScale = true;
  public constructor(
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

  public proccessReceivedMessage(message: PriceDetails) {
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

  public pushAndLogGraphLine(graphLine: GraphLine) {
    this.multi.push(graphLine);
  }

  public createNewGraphLine(
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

  public pushPointToExistingGraphSeries(
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

  public ngOnDestroy(): void {
    this.msgService.unsubscribe();
  }

  public onBtnClick() {
    /// this.multi.push(new PriceChange("21", 777.90, "CryptoCompare Index"));
    // this.multi.push(new PriceChange("22", 800.90, "CryptoCompare Index"));
    // this.single = single;
    // this.multi = multi;
    // Object.assign(this, { single, multi });
    this.create = true;
  }
  public onValuesToPlotSelectionChange(event: MatSelectChange) {
    this.changeGraph();
  }

  public onPairsToPlotSelectionChange(event: MatSelectChange) {
    this.changeGraph();
  }

  public changeGraph() {
    this.multi = [];
    for (let pair of this.selectedCryptoPair) {
      for (let value of this.selecetedValuesToPlot) {
        this.pushAndLogGraphLine(
          this.filterAllReceivedPriceDetails(pair, value)
        );
      }
    }
  }

  public filterAllReceivedPriceDetails(pair: string, valueToPlot: string): GraphLine {
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

  public onSelect(event) {
    console.log(event);
  }

  public ngOnInit() {}
}
