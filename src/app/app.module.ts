import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
// import "hammerjs";

import { JsonpModule } from "@angular/http";
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

import { PanelModule } from "primeng/panel";
import { ButtonModule } from "primeng/button";
import { RadioButtonModule } from "primeng/radiobutton";
import { DropdownModule } from "primeng/dropdown";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatSidenavContainer,
  MatSidenav,
  MatSidenavModule,
  MatToolbarModule,
  MatList,
  MatNavList,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MAT_LABEL_GLOBAL_OPTIONS,
  MatInputModule
} from "@angular/material";

import { CryptoStreamerComponent } from "./components/crypto-streamer/crypto-streamer.component";
import { PriceUpdateService } from "./services/price-update.service";
import { AppRoutingModule } from "./app-routing.module";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { CachingInterceptor } from "./caching-interceptor";
import { HttpCache } from "./models/http-cache";
import { HttpCacheBase } from "./models/HttpCacheBase";
import { NgPipesModule } from "angular-pipes";
import { SortByPipePipe } from "./pipes/sort-by-pipe.pipe";
import { CryptoDetailComponent } from "./components/crypto-detail/crypto-detail.component";
import { CryptoDetailTempStorageService } from "./services/crypto-detail-temp-storage.service";
import { CoinPricesOnExchangesTableComponent } from "./components/coin-prices-on-exchanges-table/coin-prices-on-exchanges-table.component";
import { HistoricalPriceGraphComponent } from "./components/historical-price-graph/historical-price-graph.component";
import { GoogleTrendsService } from "./services/google-trends.service";
import { GoogletrendsComponent } from "./components/googletrends/googletrends.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SocialStatsComponent } from "./components/social-stats/social-stats.component";
import { RedditapiService } from "./services/redditapi.service";

import { ConsoleLoggerService } from "./services/logger.service";
import { ApplicationHttpClient } from "./http-interceptor";
import { AlertComponent } from "./components/alert/alert.component";
import { GlobalErrorHandler } from "./global-error-handler";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import {
  FakeBackendInterceptor,
  fakeBackendProvider
} from "./fake-backend-interceptor";
import { AuthGuard } from "./auth-guard";
import { JwtInterceptor } from "./jwt-interceptor";
import { AuthenticationService } from "./services/authentication.service";
import { UserService } from "./services/user.service";

@NgModule({
  declarations: [
    HomeComponent,

    CryptoPricerComponent,

    PricegraphComponent,

    PricetableComponent,

    CryptoStreamerComponent,

    NotFoundComponent,

    SortByPipePipe,

    CryptoDetailComponent,

    CoinPricesOnExchangesTableComponent,

    HistoricalPriceGraphComponent,

    GoogletrendsComponent,

    SocialStatsComponent,

    AlertComponent,

    WelcomeComponent,

    LoginComponent,

    RegistrationComponent
  ],

  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxDatatableModule,

    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    FlexLayoutModule,
    PanelModule,
    MatInputModule,

    ButtonModule,
    RadioButtonModule,
    DropdownModule,
    NgPipesModule,
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    DropdownModule,
    AppRoutingModule,
    JsonpModule
  ],

  providers: [
    CryptoPricesService,
    CryptoDetailTempStorageService,
    HttpClient,
    PriceUpdateService,
    GoogleTrendsService,
    RedditapiService,
    fakeBackendProvider,
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: "always" } }
  ],
  bootstrap: [HomeComponent]
})
export class AppModule {}
