import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { DISPLAY, PriceDetails } from "../../models/pricedetailed";
import { PriceDetailsMessageService } from "../../services/price-details-message.service";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

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
    { prop: "FROMSYMBOL" },
    { prop: "TOSYMBOL" },
    { prop: "MARKET" },
    { prop: "PRICE" },
    { prop: "LASTVOLUME" },
    { prop: "LASTVOLUMETO" },
    { prop: "LASTTRADEID" },
    { prop: "VOLUME24HOUR" },
    { prop: "VOLUME24HOURTO" },
    { prop: "OPEN24HOUR" },
    { prop: "HIGH24HOUR" },
    { prop: "LOW24HOUR" },
    { prop: "LASTMARKET" },
    { prop: "CHANGE24HOUR" },
    { prop: "CHANGEPCT24HOUR" }];


  constructor(msgService: PriceDetailsMessageService) {

    this.msgService = msgService.getMessage().subscribe(message => {
      this.addRow(message);
    });


  }
  ngOnDestroy(): void {
    this.msgService.unsubscribe();
  }

  addRow(row: PriceDetails) {
    setTimeout(() => {
      this.rows.push(row);

      this.loadingIndicator = false;
      console.log("ROWS:", this.rows);
      this.rows = [...this.rows];
    }, 0);
  }

}
