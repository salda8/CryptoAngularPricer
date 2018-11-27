import { Component, AfterViewInit, OnInit, ElementRef } from "@angular/core";
import {
  Router, NavigationStart, NavigationCancel, NavigationEnd
} from "@angular/router";
import { routes } from "../../app-routing.module";
import { RouterModule, Route } from "@angular/router";
import { User } from "../../models/user";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]

})
export class HomeComponent implements AfterViewInit, OnInit {

  public title: string;
  public loading: boolean;
  public currentUser: User;
  public logged: boolean;

  public constructor(private router: Router, private elementRef: ElementRef, private authenticationService: AuthenticationService) {
    this.title = "app";
    this.loading = true;

  }

  public logout() {
    this.authenticationService.logout();
    this.logged = !this.logged;

  }

  public checkIfUserIsLogedAndGetUser() {
    this.currentUser = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : undefined;
    if (this.currentUser) {
      this.logged = true;
    } else {
      this.logged = false;
    }
  }

  public ngAfterViewInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
          console.log("NAVIGATION START", event);
          this.checkIfUserIsLogedAndGetUser();
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.loading = false;
          console.log("NAVIGATION END", event);
        }
      });

  }

  public ngOnInit() {
  }

}
