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
  rows = [

  ];

  columns = [
    { prop: "FROMSYMBOL", name: "PAIR" },


    { prop: "PRICE" },
    { prop: "CHANGEPCT24HOUR", name: "CHANGE 24H (%)" },
    { prop: "OPEN24HOUR" },
    { prop: "HIGH24HOUR" },
    { prop: "LOW24HOUR" },

    { prop: "CHANGE24HOUR" },

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


    setTimeout(() => {
      this.rows.push(rowToAdd);

      this.loadingIndicator = false;
      console.log("ROWS:", this.rows);
      this.rows = [...this.rows];
    }, 0);
  }

}
