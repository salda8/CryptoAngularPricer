import { Component, OnInit } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { PriceDetailsMessageService } from "../../services/price-details-message.service";
import { Subscription } from "rxjs/Subscription";
import { PriceChange, PriceDetails, Series } from "../../models/pricedetailed";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { String, StringBuilder } from "typescript-string-operations-ng4";
import { SelectItem } from "primeng/primeng";
import { MatChip, MatChipSelectionChange, MatSelectChange } from "@angular/material";
import { FormControl } from "@angular/forms";


@Component({
  selector: "app-pricegraph",
  templateUrl: "./pricegraph.component.html",
  styleUrls: ["./pricegraph.component.css"]
})
export class PricegraphComponent implements OnInit, OnDestroy {

  msgService: Subscription;
  selectedMultiSeries: string;
  single: any[];
  multi: PriceChange[] = [];

  cars: SelectItem[];
  multipleSelectedMultiSeries: String[] = [];
  view: any[] = [700, 400];
  pairsToPlotControl: FormControl = new FormControl();
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



  // line, area
  autoScale = true;

  constructor(msgService: PriceDetailsMessageService) {

    this.msgService = msgService.getMessage().subscribe(message => {
      let seriesName = String.Join("/", message.FROMSYMBOL, message.TOSYMBOL);
      if (this.multi.length === 0) {
        this.createNewPriceChangeLine(seriesName, message);

      }
      else {

        let multiFound = this.multi.find(x => x.name === seriesName);
        if (multiFound !== undefined) {
          multiFound.series.push(new Series(new Date().getSeconds().toString(), message.PRICE));
          console.log(this.multi);
          this.multi = [...this.multi];
        }
        else {
          this.createNewPriceChangeLine(seriesName, message);

        }

      }

    });


  }

  createNewPriceChangeLine(seriesName: string, priceDetails: PriceDetails) {
    let series: Series[] = [];
    series.push(new Series(new Date().getSeconds().toString(), priceDetails.PRICE));

    let priceChange = new PriceChange(seriesName, series);
    console.log(priceChange);
    this.multi.push(priceChange);
    console.log(this.multi);
    this.create = true;
  }

  ngOnDestroy(): void {
    this.msgService.unsubscribe();
  }

  removeSpecials(str: string) {
    let lower = str.toLowerCase(); // toLowerCase();
    let upper = str.toUpperCase();

    let res = "";
    for (let i = 0; i < lower.length; ++i) {
      if (lower[i] !== upper[i] || lower[i].trim() === "")
        res += str[i];
    }
    return +res;
  }

  onBtnClick() {
    /// this.multi.push(new PriceChange("21", 777.90, "CryptoCompare Index"));
    // this.multi.push(new PriceChange("22", 800.90, "CryptoCompare Index"));
    // this.single = single;
    // this.multi = multi;
    // Object.assign(this, { single, multi });
    this.create = true;

  }

  onLineSeriesChange(event: MatSelectChange) {

  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }

}
