import { Component, OnInit, Pipe, PipeTransform } from "@angular/core";
import { CryptoPricesService } from "../../services/crypto-prices.service";
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from "@angular/forms";
import { Currency } from "../../models/currency";
import { String, StringBuilder } from "typescript-string-operations-ng4";
import { forEach } from "@angular/router/src/utils/collection";
import { DISPLAY, PriceDetailed, PriceDetails } from "../../models/pricedetailed";
import { PriceUpdateService } from "../../services/price-update.service";
import { Ticker } from "../../models/ticker";
import { CURRENCIES } from "@angular/common/src/i18n/currencies";
import { MatOption, MatCheckbox } from "@angular/material";
import { FlattenPipe, TakePipe, OrderByPipe } from "angular-pipes";
import { SortByPipePipe } from "../../pipes/sort-by-pipe.pipe";


@Component({
  selector: "app-crypto-pricer",
  templateUrl: "./crypto-pricer.component.html",
  styleUrls: ["./crypto-pricer.component.css"]


})
export class CryptoPricerComponent implements OnInit {
  timeout: 10000;
  color = "warn";
  mode = "indeterminate";

  loading = true;
  value = 50;
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
  optionArr: MatOption[] = [];
  cryptoList: Ticker[] = [];
  selectedCrypto: string[] = [];
  enableStreamer: false;
  currenciesList: Currency[] = [new Currency("USD", 1, true), new Currency("EUR", 4), new Currency("ETH", 3), new Currency("BTC", 2), new Currency("CZK", 6), new Currency("LTC", 5)];
  priceDetail: PriceDetails[] = [];
  selectedCurrency: string[] = [];
  cryptoListFilterParameters = [
    "id",
    "price_usd",
    "price_btc",
    "volume_usd",
    "market_cap_usd",
    "available_supply",
    "total_supply",
    "max_supply",
    "percent_change_1h",
    "percent_change_24h",
    "percent_change_7d"];

  selectedCryptoListFilter: string = "";



  constructor(service: CryptoPricesService, fb: FormBuilder, msgService: PriceUpdateService) {
    this.fb = fb;
    this.service = service;
    this.msgService = msgService;


  }
  selectAll() {

    // let orderbyMktCap: string[] = OrderByPipe.prototype.transform(this.cryptoList.map(x => x.symbol), "MKTCAP");
    // console.log(orderbyMktCap);
    // let s = 0, i = 0;
    // const max = 300;
    // for (let o of orderbyMktCap) {
    //   let l = o.length + 1;
    //   if (l + s < 300) {
    //     s += l;
    //     i++;
    //     console.log(s, i);
    //     continue;

    //   }
    //   console.log("BREAK");
    //   break;
    // }

    // let flat = FlattenPipe.prototype.transform(TakePipe.prototype.transform(orderbyMktCap, i));
    // let remaining = orderbyMktCap.length - i;
    // console.log(flat);
    this.selectedCrypto = this.cryptoList.map(x => x.symbol);
    this.requestform.patchValue({ "ticker": this.selectedCrypto });



  }
  onFilterChange($event) {

    this.cryptoList = SortByPipePipe.prototype.sort(this.cryptoList, this.selectedCryptoListFilter, "desc");
    console.log(this.cryptoList);
    // this.cryptoList = OrderByPipe.prototype.transform(this.cryptoList, [this.selectedCryptoListFilter, "+"]);

    // this.requestform.patchValue({ "ticker": this.selectedCrypto });
  }

  onChange(newValue) {

  }

  checkboxOnClick($event) {

  }

  createForm() {
    let group: any = {};
    // let ticker = new FormControl("ticker", Validators.required);

    this.requestform = this.fb.group({
      ticker: [[], Validators.required],
      currencies: [[], Validators.required],
      filter: [[]]


    });



  }

  async ngOnInit() {
    this.loading = true;
    this.createForm();
    let availableTickers: Object | Ticker[] = await this.service.getAllAvailableTickers(); // .then<Ticker[]>(t => this.cryptoList = t);
    this.cryptoList = (<Ticker[]>availableTickers);
    this.cryptoList.find(x => x.symbol === "MIOTA").symbol = "IOTA";

    this.getFromLocalStorage();
    this.loading = false;

  }

  getFromLocalStorage() {
    let tickersFromStorage = localStorage.getItem("selectedTicker");


    let currencyFromStorage = localStorage.getItem("selectedCurrency");
    if (currencyFromStorage.length > 0) {

      for (let currency of currencyFromStorage.split(",")) {

        let cFromStorage = this.currenciesListString.find(x => x === currency);
        this.selectedCurrency.push(cFromStorage);

        this.requestform.patchValue({ "currencies": this.selectedCurrency });

        // this.requestform.value.ticker = cFromStorage;
        // this.selectedCurrency.push(cFromStorage);

      }
    }
    if (tickersFromStorage.length > 0) {
      for (let ticker of tickersFromStorage.split(",")) {

        let tickerFromStorage = this.cryptoList.find(x => x.symbol === ticker);
        if (tickerFromStorage) {
          this.selectedCrypto.push(tickerFromStorage.symbol);
          this.requestform.patchValue({ "ticker": this.selectedCrypto });
        }

      }
    }

    this.requestform.updateValueAndValidity(); // = tickerFromStorage;
  }



  getPriceMulti() {
    let selectedCrypto = this.selectedCrypto;
    let selectedCurrency = this.selectedCurrency;

    let selected = selectedCurrency.length === 1 ? selectedCurrency[0] : String.Join(",", selectedCurrency);
    let selectedTicker = selectedCrypto.length === 1 ? selectedCrypto[0] : String.Join(",", selectedCrypto);
    localStorage.setItem("selectedCurrency", selected);
    localStorage.setItem("selectedTicker", selectedTicker);
    this.service.getPriceMultiByTicker(selectedCrypto, selectedCurrency);

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
