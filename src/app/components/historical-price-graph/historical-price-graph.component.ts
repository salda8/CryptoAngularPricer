import { Component, OnInit, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { GraphLine, PriceDetails } from "../../models/pricedetailed";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-historical-price-graph",
  templateUrl: "./historical-price-graph.component.html",
  styleUrls: ["./historical-price-graph.component.css"]
})
export class HistoricalPriceGraphComponent implements OnInit {
  @Input()
  public coin: string;

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
  public autoScale = true;
  public graphData: GraphLine[] = [];
  public months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  public colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };
  public constructor() { }

  public ngOnInit() {
  }

}
