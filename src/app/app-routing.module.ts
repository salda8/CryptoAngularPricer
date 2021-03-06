import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CryptoPricerComponent } from "./components/crypto-pricer/crypto-pricer.component";
import { CryptoStreamerComponent } from "./components/crypto-streamer/crypto-streamer.component";

import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SelectivePreloadingStrategy } from "./selective-preloading-strategy";
import { CryptoDetailComponent } from "./components/crypto-detail/crypto-detail.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AuthGuard } from "./auth-guard";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", redirectTo: "/" },
  { path: "price", component: CryptoPricerComponent },

  { path: "stream?:currency&:ticker", component: CryptoStreamerComponent },
  { path: "stream", component: CryptoStreamerComponent },
  { path: "coin?*name&*symbol", component: CryptoDetailComponent },
  { path: "coin", component: CryptoDetailComponent },
  { path: "welcome", component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "*", component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategy
    })
  ],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategy]
})
export class AppRoutingModule {}
