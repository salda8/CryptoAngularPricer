import { Component, OnInit } from "@angular/core";
import { CryptoPricesService } from "../../services/crypto-prices.service";
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from "@angular/forms";
import { Currency } from "../../models/currency";
import { String, StringBuilder } from "typescript-string-operations-ng4";
import { forEach } from "@angular/router/src/utils/collection";
import { DISPLAY, PriceDetailed, PriceDetails } from "../../models/pricedetailed";
import { PriceDetailsMessageService } from "../../services/price-details-message.service";



@Component({
  selector: "app-crypto-pricer",
  templateUrl: "./crypto-pricer.component.html",
  styleUrls: ["./crypto-pricer.component.css"]
})
export class CryptoPricerComponent implements OnInit {
  msgService: PriceDetailsMessageService;
  fb: FormBuilder;
  requestform: FormGroup;
  unhideBtnTexts: string[] = [];
  unhideBtnText: string = "";
  prices: string[] = [];
  service: CryptoPricesService;
  currenciesList: Currency[] = [];
  priceDetail: PriceDetails[] = [];
  selectedCurrency: string;
  selectedCurrency2: string;
  hideAdditionalCurrency: boolean = true;

  constructor(service: CryptoPricesService, fb: FormBuilder, msgService: PriceDetailsMessageService) {
    this.fb = fb;
    this.service = service;
    this.msgService = msgService;

  }

  createForm(questions: Currency[]) {
    let group: any = {};
    let ticker = new FormControl("ticker", Validators.required);

    this.requestform = this.fb.group({
      ticker: ["ETH", Validators.required],
      currencies: this.currenciesList
    });

  }

  ngOnInit() {
    this.unhideBtnTexts.push("Add one more currency");
    this.unhideBtnTexts.push("Remove");
    this.unhideBtnText = this.unhideBtnTexts[0];
    this.currenciesList.push(new Currency("USD", 1));
    this.currenciesList.push(new Currency("BTC", 2));
    this.currenciesList.push(new Currency("ETH", 3));
    this.currenciesList.push(new Currency("EUR", 4));
    this.currenciesList.push(new Currency("LTC", 5));
    this.currenciesList.push(new Currency("CZK", 6));
    this.createForm(this.currenciesList);


  }

  getPriceMulti() {
    const formModel = this.requestform.value;
    let selected = String.Join(",", this.selectedCurrency, this.selectedCurrency2);
    this.service.getPriceMultiByTicker(formModel.ticker, selected).subscribe(result => {

      // bject.getOwnPropertyNames(res);
      let detailedPrice: PriceDetailed = JSON.parse(JSON.stringify(result));
      let x = detailedPrice.RAW[formModel.ticker];
      let xx = x[this.selectedCurrency];

      this.msgService.sendMessage(xx);



    }, error => console.log("ERROR: ", error)

    );
  }

  getPrice() {
    const formModel = this.requestform.value;
    let selected = String.Join(",", this.selectedCurrency, this.selectedCurrency2);
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

  unhideBtnClick() {
    if (this.hideAdditionalCurrency) {
      setTimeout(() => {
        this.hideAdditionalCurrency = false;
        this.unhideBtnText = this.unhideBtnTexts[1];
      }, 1);
    }
    else {
      setTimeout(() => {
        this.hideAdditionalCurrency = true;
        this.unhideBtnText = this.unhideBtnTexts[0];
        this.selectedCurrency = "";
      }, 1);
    }

  }

}
