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
  coin: string;

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
  autoScale = true;
  graphData: GraphLine[] = [];

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };
  constructor() { }

  ngOnInit() {
  }

}
