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
  public set TimelineData(value: TimelineData[]) {
    this.timelineData = value;

  }

  public get TimelineData(): TimelineData[] { return this.timelineData; }

  @Input()
  public coin: string;

  public view: any[] = [700, 400];
  public pairsToPlotControl: FormControl = new FormControl();
  public valuesToPlotControl: FormControl = new FormControl();
  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = "Date";
  public showYAxisLabel = true;
  public yAxisLabel = "Mentions";
  public create = false;
  public autoScale = true;
  public graphData: GraphLine[] = [];

  public colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  private timelineData: TimelineData[] = [];
  public constructor() {

  }

  public ngOnInit() {

    this.createGraph(this.timelineData);

  }

  public createGraph(data: TimelineData[]) {
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
