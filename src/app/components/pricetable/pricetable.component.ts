import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { DISPLAY, PriceDetails } from "../../models/pricedetailed";
import { PriceUpdateService } from "../../services/price-update.service";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { NgPipesModule, RoundPipe } from "angular-pipes";

@Component({
  selector: "app-pricetable",
  templateUrl: "./pricetable.component.html",
  styleUrls: ["./pricetable.component.css"]
})
export class PricetableComponent implements OnDestroy {

  msgService: Subscription;
  loadingIndicator: boolean;
  offset = 0;
  maxRows = 20;
  filter: string = "";
  lastFilterLength: number = 1;
  tempRows = [];
  rows = [

  ];

  columns = [
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


  constructor(msgService: PriceUpdateService) {

    this.msgService = msgService.getMessage().subscribe(message => {
      this.addRow(message);
    });


  }
  ngOnDestroy(): void {
    this.msgService.unsubscribe();
  }

  addRow(row: PriceDetails) {
    let rowToAdd = { ...row };
    rowToAdd.FROMSYMBOL = rowToAdd.FROMSYMBOL + "/" + rowToAdd.TOSYMBOL;
    rowToAdd.CHANGE24HOUR = RoundPipe.prototype.transform(rowToAdd.CHANGE24HOUR, 1);
    rowToAdd.CHANGEPCT24HOUR = RoundPipe.prototype.transform(rowToAdd.CHANGEPCT24HOUR, 2);
    this.tempRows.push(rowToAdd);
    this.tempRows = [...this.tempRows];


    setTimeout(() => {
      this.rows.push(rowToAdd);

      this.loadingIndicator = false;
      this.rows = [...this.rows];
    }, 0);
  }

  updateFilter($event) {


    let filteredArray = [];
    if (this.filter.length > this.lastFilterLength) {
      for (let row of this.rows) {
        if (row.FROMSYMBOL.indexOf(this.filter) >= 0) {
          filteredArray.push(row);
        }
      }
    }
    else {
      for (let row of this.tempRows) {
        if (row.FROMSYMBOL.indexOf(this.filter) >= 0) {
          filteredArray.push(row);
        }
      }
    }
    this.lastFilterLength = this.filter.length;
    console.log(filteredArray);


    // update the rows
    this.rows = [...filteredArray];

    // Whenever the filter changes, always go back to the first page
    this.offset = 0;

  }
  getCellClass({ row, column, value }): any {
    if (value > 0) {
      if (value > 10) {
        return " is-big-plus";
      }
      return " is-plus";
    }
    else {
      if (value < -10) {
        return " is-big-minus";
      }

      return " is-minus";
    }



  }
}
