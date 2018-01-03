import { Component, AfterViewInit, OnInit } from "@angular/core";
import {
  Router, NavigationStart, NavigationCancel, NavigationEnd
} from "@angular/router";
import { routes } from "../../app-routing.module";
import { RouterModule, Route } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]

})
export class HomeComponent implements AfterViewInit, OnInit {


  title: string;
  loading: boolean;


  constructor(private router: Router) {
    this.title = "app";
    this.loading = true;



  }

  ngAfterViewInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
          console.log("NAVIGATION START");
        }
        else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.loading = false;
          console.log("NAVIGATION END");
        }
      });
  }



  ngOnInit() {
  }

}
