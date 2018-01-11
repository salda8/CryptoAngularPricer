import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CryptoPricesService } from "../../services/crypto-prices.service";
import { CryptoDetailTempStorageService } from "../../services/crypto-detail-temp-storage.service";
import { PriceDetails } from "../../models/pricedetailed";
import { GoogleTrendsService } from "../../services/google-trends.service";
import { Observable, Subscription } from "rxjs";
import { TimelineData } from "../../models/google-trends";
import { CoinSnapshot } from "../../models/coin-snapshot";


@Component({
  selector: "app-crypto-detail",
  templateUrl: "./crypto-detail.component.html",
  styleUrls: ["./crypto-detail.component.css"]
})
export class CryptoDetailComponent implements OnInit {
  coin: string;
  coinSymbol: string;
  priceDetails: PriceDetails;
  timelineData: TimelineData[] = [];
  coinSnapshot: CoinSnapshot;

  constructor(private route: ActivatedRoute, private storage: CryptoDetailTempStorageService, private googleTrends: GoogleTrendsService, private priceService: CryptoPricesService) {


  }

  ngOnInit() {
    console.log(this.route.snapshot);
    this.coinSymbol = this.route.snapshot.queryParams["symbol"];
    this.coin = this.route.snapshot.queryParams["name"];
    this.priceDetails = this.storage.load();
    this.googleTrends.interestByRegionTrendSearch(this.coin, "0").subscribe(res => {
      this.timelineData = JSON.parse(JSON.stringify(res))["default"]["timelineData"];

    });

    this.priceService.getCoinSnapshot(this.coinSymbol).subscribe(res => {
      this.coinSnapshot = JSON.parse(JSON.stringify(res));
    });


  }

}
