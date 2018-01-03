import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { CryptoPricerComponent } from "./components/crypto-pricer/crypto-pricer.component";
import { CryptoStreamerComponent } from "./components/crypto-streamer/crypto-streamer.component";
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { enableDebugTools } from "@angular/platform-browser/src/browser/tools/tools";
import { SelectivePreloadingStrategy } from "./selective-preloading-strategy";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", redirectTo: "/" },
  { path: "price", component: CryptoPricerComponent },

  { path: "stream?:currency&:ticker", component: CryptoStreamerComponent },
  { path: "stream", component: CryptoStreamerComponent },
  { path: "*", component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true, // <-- debugging purposes only
    preloadingStrategy: SelectivePreloadingStrategy
  })],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategy]

})
export class AppRoutingModule {

}
