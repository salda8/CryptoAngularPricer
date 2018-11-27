import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CryptoPricesService } from "../../services/crypto-prices.service";
import { CryptoDetailTempStorageService } from "../../services/crypto-detail-temp-storage.service";
import { PriceDetails } from "../../models/pricedetailed";
import { GoogleTrendsService } from "../../services/google-trends.service";
import { Observable, Subscription } from "rxjs";
import { TimelineData } from "../../models/google-trends";
import { CoinSnapshot } from "../../models/coin-snapshot";
import { AfterViewInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
  selector: "app-crypto-detail",
  templateUrl: "./crypto-detail.component.html",
  styleUrls: ["./crypto-detail.component.css"]
})
export class CryptoDetailComponent implements OnInit {
  public coin: string;
  public coinSymbol: string;
  public priceDetails: PriceDetails;
  public loading = true;
  public timelineData: TimelineData[] = [];
  public coinSnapshot: CoinSnapshot;

  public constructor(private route: ActivatedRoute, private router: Router, private storage: CryptoDetailTempStorageService,
    private googleTrends: GoogleTrendsService, private priceService: CryptoPricesService) {

  }

  public ngOnInit() {

    this.coinSymbol = this.route.snapshot.queryParams.symbol;
    this.coin = this.route.snapshot.queryParams.name;
    console.log(this.coinSymbol);
    this.priceDetails = this.storage.load();
    this.googleTrends.interestByRegionTrendSearch(this.coin, "0").subscribe(res => {
      this.timelineData = JSON.parse(JSON.stringify(res)).default.timelineData;

    });

    this.priceService.getCoinSnapshot(this.coinSymbol).subscribe(res => {
      this.coinSnapshot = JSON.parse(JSON.stringify(res));
    });

  }

}
