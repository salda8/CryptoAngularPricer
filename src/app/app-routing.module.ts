import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { CryptoPricerComponent } from "./components/crypto-pricer/crypto-pricer.component";
import { CryptoStreamerComponent } from "./components/crypto-streamer/crypto-streamer.component";
import { HomeComponent } from "./components/home/home.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "price", component: CryptoPricerComponent },

  { path: "stream?:currency&:ticker", component: CryptoStreamerComponent },
  { path: "stream", component: CryptoStreamerComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
