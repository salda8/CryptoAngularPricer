import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
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
import {
  MatButtonModule, MatCheckboxModule, MatChipsModule, MatFormFieldModule, MatSelectModule, MatOptionModule,
  MatSidenavContainer, MatSidenav, MatSidenavModule, MatToolbarModule, MatList, MatNavList, MatListModule, MatMenuModule, MatProgressSpinnerModule
} from "@angular/material";

import { CryptoStreamerComponent } from "./components/crypto-streamer/crypto-streamer.component";
import { PriceUpdateService } from "./services/price-update.service";
import { AppRoutingModule } from "./app-routing.module";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { CachingInterceptor } from "./caching-interceptor";
import { HttpCacheBase, HttpCache } from "./models/http-cache";


@NgModule({//
  declarations: [

    HomeComponent,

    CryptoPricerComponent,

    PricegraphComponent,

    PricetableComponent,

    CryptoStreamerComponent,

    NotFoundComponent


  ],
  imports: [
    ReactiveFormsModule, HttpModule, HttpClientModule, FormsModule, NgxDatatableModule, AccordionModule,
    MatChipsModule, MatFormFieldModule, MatSelectModule, MatSidenavModule, MatToolbarModule, MatListModule, MatMenuModule, MatProgressSpinnerModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule, DropdownModule,
    BrowserModule, NgxChartsModule, BrowserAnimationsModule, DropdownModule, AppRoutingModule


  ],
  providers: [CryptoPricesService, HttpClient, MessageService, PriceDetailsMessageService, PriceUpdateService, CachingInterceptor, { provide: HttpCacheBase, useClass: HttpCache }],
  bootstrap: [HomeComponent]
})
export class AppModule { }
