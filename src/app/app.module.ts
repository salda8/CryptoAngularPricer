import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
// import "hammerjs";

import { HttpModule } from "@angular/http";
import { HttpParams, HttpClient, HttpClientModule } from "@angular/common/http";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { HomeComponent } from "./components/home/home.component";
import { CryptoPricesService } from "./services/crypto-prices.service";
import { CryptoPricerComponent } from "./components/crypto-pricer/crypto-pricer.component";
import { PricegraphComponent } from "./components/pricegraph/pricegraph.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PricetableComponent } from "./components/pricetable/pricetable.component";
import { MessageService } from "./services/message.service";
import { PriceDetailsMessageService } from "./services/price-details-message.service";
import { AccordionModule } from "primeng/primeng";
import { PanelModule } from "primeng/primeng";
import { ButtonModule } from "primeng/primeng";
import { RadioButtonModule, DropdownModule } from "primeng/primeng";
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatFormFieldModule, MatSelectModule, MatOptionModule } from "@angular/material";

import { CryptoStreamerComponent } from "./components/crypto-streamer/crypto-streamer.component";
import { PriceUpdateService } from "./services/price-update.service";




@NgModule({//
  declarations: [

    HomeComponent,

    CryptoPricerComponent,

    PricegraphComponent,

    PricetableComponent,

    CryptoStreamerComponent

  ],
  imports: [
    ReactiveFormsModule, HttpModule, HttpClientModule, FormsModule, NgxDatatableModule, AccordionModule, MatChipsModule, MatFormFieldModule, MatSelectModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule, DropdownModule,
    BrowserModule, NgxChartsModule, BrowserAnimationsModule, DropdownModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "test", component: CryptoPricerComponent },
      { path: "streamer", component: CryptoStreamerComponent }])
  ],
  providers: [CryptoPricesService, HttpClient, MessageService, PriceDetailsMessageService, PriceUpdateService],
  bootstrap: [HomeComponent]
})
export class AppModule { }
