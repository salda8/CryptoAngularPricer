import { Component, OnInit } from "@angular/core";
import { CryptoPricesService } from "../../services/crypto-prices.service";
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from "@angular/forms";
import { Currency } from "../../models/currency";
import { String, StringBuilder } from "typescript-string-operations-ng4";
import { forEach } from "@angular/router/src/utils/collection";
import { DISPLAY, PriceDetailed, PriceDetails } from "../../models/pricedetailed";
import { PriceUpdateService } from "../../services/price-update.service";
import { Ticker } from "../../models/ticker";
import { CURRENCIES } from "@angular/common/src/i18n/currencies";

@Component({
  selector: "app-crypto-pricer",
  templateUrl: "./crypto-pricer.component.html",
  styleUrls: ["./crypto-pricer.component.css"]
})
export class CryptoPricerComponent implements OnInit {
  timeout: 10000;
  msgService: PriceUpdateService;
  fb: FormBuilder;
  requestform: FormGroup;
  unhideBtnTexts: string[] = [];
  unhideBtnText: string = "";
  prices: string[] = [];
  service: CryptoPricesService;
  currencyControl: FormControl = new FormControl();
  currenciesListString: string[] = ["USD", "EUR", "BTC", "ETH"];
  cryptoListString: string[] = [];
  selectedCryptoString: string[] = [];
  cryptoList: Ticker[] = [];
  selectedCrypto: Ticker[] = [];
  enableStreamer: false;
  currenciesList: Currency[] = [new Currency("USD", 1, true), new Currency("EUR", 4), new Currency("ETH", 3), new Currency("BTC", 2), new Currency("CZK", 6), new Currency("LTC", 5)];
  priceDetail: PriceDetails[] = [];
  selectedCurrency: string[] = [this.currenciesListString[0]];


  constructor(service: CryptoPricesService, fb: FormBuilder, msgService: PriceUpdateService) {
    this.fb = fb;
    this.service = service;
    this.msgService = msgService;

  }

  createForm(questions: Currency[]) {
    let group: any = {};
    // let ticker = new FormControl("ticker", Validators.required);

    this.requestform = this.fb.group({
      ticker: [this.selectedCrypto, Validators.required],
      currencies: [[], Validators.required]
    });



  }

  ngOnInit() {
    this.unhideBtnTexts.push("Add one more currency");
    this.unhideBtnTexts.push("Remove");
    this.unhideBtnText = this.unhideBtnTexts[0];
    let availableTickers = this.service.getAllAvailableTickers().subscribe((message) => {
      let toReturn: string[];


      let tickers: Ticker[] = JSON.parse(JSON.stringify(message));

      for (let i = 0; i < tickers.length; i++) {

        this.cryptoList.push(tickers[i]);


      }

      // this.selectedCrypto.push(this.cryptoList[0]);
    });



    this.createForm(this.currenciesList);


  }

  getPriceMulti() {
    const formModel = this.requestform.value;
    let selected = this.selectedCurrency.length === 1 ? this.selectedCurrency[0] : String.Join(",", this.selectedCurrency);
    this.service.getPriceMultiByTicker(formModel.ticker, selected).subscribe(result => {

      // bject.getOwnPropertyNames(res);
      let detailedPrice: PriceDetailed = JSON.parse(JSON.stringify(result));
      let display = detailedPrice.DISPLAY[formModel.ticker];
      let raw = detailedPrice.RAW[formModel.ticker];
      console.log("RAW", raw);

      raw = raw[selected];
      let priceDetails: PriceDetails = raw;
      priceDetails.FROMSYMBOL = display[selected].FROMSYMBOL;
      priceDetails.TOSYMBOL = display[selected].TOSYMBOL;
      priceDetails.PRICE = raw.PRICE;
      priceDetails.DATEWHENRECEIVED = new Date();
      this.msgService.sendMessage(priceDetails);
      // this.msgService.sendDisplayMessage(detailedPrice);



    }, error => console.log("ERROR: ", error)

    );
  }

  getPriceUpdatesMulti() {
    let selected = this.selectedCurrency.length === 1 ? this.selectedCurrency[0] : String.Join(",", this.selectedCurrency);
    const formModel = this.requestform.value;
    this.service.getContinousPriceUpdateS(formModel.ticker, selected);
  }

  getPrice() {
    const formModel = this.requestform.value;

    let selected = this.selectedCurrency.length === 1 ? this.selectedCurrency[0] : String.Join(",", this.selectedCurrency);
    this.service.getPriceByTicker(formModel.ticker, selected).subscribe(result => {
      console.log("RESULT:", JSON.stringify(result));
      // bject.getOwnPropertyNames(res);
      let propertyName = Object.getOwnPropertyNames(result);
      let property1 = Object.getOwnPropertyDescriptor(result, propertyName[0]);
      this.prices = [];
      let i = 0;
      let isLast = false;
      while (!isLast) {
        let property = Object.getOwnPropertyDescriptor(result, propertyName[i]);
        if (property !== undefined) {
          let res = "One " + formModel.ticker + " is " + property.value + " " + propertyName[i];
          this.prices.push(res);
        }
        else {
          isLast = true;
        }

        i++;
      }


    }, error => console.log("ERROR: ", error)

    );
  }



}
