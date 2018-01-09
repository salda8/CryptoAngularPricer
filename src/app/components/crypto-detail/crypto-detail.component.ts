import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CryptoPricesService } from "../../services/crypto-prices.service";
import { CryptoDetailTempStorageService } from "../../services/crypto-detail-temp-storage.service";
import { PriceDetails } from "../../models/pricedetailed";
import { MatGridList, MatGridTile } from "@angular/material";

@Component({
  selector: "app-crypto-detail",
  templateUrl: "./crypto-detail.component.html",
  styleUrls: ["./crypto-detail.component.css"]
})
export class CryptoDetailComponent implements OnInit {
  tiles = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  currency: string;
  priceDetails: PriceDetails;

  constructor(private route: ActivatedRoute, private storage: CryptoDetailTempStorageService) {

  }

  ngOnInit() {

    this.currency = this.route.snapshot.params["coin"];
    this.priceDetails = this.storage.load();
  }

}
