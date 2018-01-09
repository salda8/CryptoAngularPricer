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
import { ContinousPriceUpdatesMessageService } from "./services/price-details-message.service";
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
import { NgPipesModule } from "angular-pipes";
import { SortByPipePipe } from "./pipes/sort-by-pipe.pipe";
import { CryptoDetailComponent } from "./components/crypto-detail/crypto-detail.component";
import { CryptoDetailTempStorageService } from "./services/crypto-detail-temp-storage.service";
import { CoinPricesOnExchangesTableComponent } from './component/coin-prices-on-exchanges-table/coin-prices-on-exchanges-table.component';


@NgModule({//
  declarations: [

    HomeComponent,

    CryptoPricerComponent,

    PricegraphComponent,

    PricetableComponent,

    CryptoStreamerComponent,

    NotFoundComponent,

    SortByPipePipe,

    CryptoDetailComponent,

    CoinPricesOnExchangesTableComponent


  ],
  imports: [
    ReactiveFormsModule, HttpModule, HttpClientModule, FormsModule, NgxDatatableModule, AccordionModule,
    MatChipsModule, MatFormFieldModule, MatSelectModule, MatSidenavModule, MatToolbarModule, MatListModule, MatMenuModule, MatProgressSpinnerModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule, DropdownModule,
    NgPipesModule,
    BrowserModule, NgxChartsModule, BrowserAnimationsModule, DropdownModule, AppRoutingModule


  ],
  providers: [CryptoPricesService, CryptoDetailTempStorageService, HttpClient, MessageService, ContinousPriceUpdatesMessageService,
    PriceUpdateService, CachingInterceptor, { provide: HttpCacheBase, useClass: HttpCache }],
  bootstrap: [HomeComponent]
})
export class AppModule { }
