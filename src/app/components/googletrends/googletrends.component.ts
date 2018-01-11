import { Component, OnInit, Input } from "@angular/core";
import { TimelineData } from "../../models/google-trends";
import { FormControl } from "@angular/forms";
import { GraphLine, GraphSeries } from "../../models/pricedetailed";

@Component({
  selector: "app-googletrends",
  templateUrl: "./googletrends.component.html",
  styleUrls: ["./googletrends.component.css"]
})
export class GoogletrendsComponent implements OnInit {

  @Input()
  set TimelineData(value: TimelineData[]) {
    this.timelineData = value;
    this.createGraph(value);
  }

  get TimelineData(): TimelineData[] { return this.timelineData; }

  @Input()
  coin: string = "";

  view: any[] = [700, 400];
  pairsToPlotControl: FormControl = new FormControl();
  valuesToPlotControl: FormControl = new FormControl();
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = "Date";
  showYAxisLabel = true;
  yAxisLabel = "Mentions";
  create = false;
  autoScale = true;
  graphData: GraphLine[] = [];

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  private timelineData: TimelineData[] = [];
  constructor() {

  }

  ngOnInit() {
  }

  createGraph(data: TimelineData[]) {
    let series: GraphSeries[] = [];
    for (let d of data) {
      let graphSeries = new GraphSeries(new Date(+d.time * 1000), d.value[0]);
      series.push(graphSeries);
    }

    let graphLine = new GraphLine(this.coin, series);
    this.graphData.push(graphLine);

    console.log(graphLine);
    this.create = true;

  }

}
