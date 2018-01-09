import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CryptoPricesService } from "../../services/crypto-prices.service";
import { CryptoDetailTempStorageService } from "../../services/crypto-detail-temp-storage.service";
import { PriceDetails } from "../../models/pricedetailed";

@Component({
  selector: "app-crypto-detail",
  templateUrl: "./crypto-detail.component.html",
  styleUrls: ["./crypto-detail.component.css"]
})
export class CryptoDetailComponent implements OnInit {

  currency: string;
  priceDetails: PriceDetails;

  constructor(private route: ActivatedRoute, private storage: CryptoDetailTempStorageService) {

  }

  ngOnInit() {

    this.currency = this.route.snapshot.params["coin"];
    this.priceDetails = this.storage.load();
  }

}
