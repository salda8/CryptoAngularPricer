import { Component, AfterViewInit, OnInit, ElementRef } from "@angular/core";
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
  name: string = "";


  constructor(private router: Router, private elementRef: ElementRef) {
    this.title = "app";
    this.loading = true;
    this.name = !localStorage.getItem("name") ? "" : "Hello, Welcome back:" + localStorage.getItem("name");



  }

  setNameBtnClick() {
    localStorage.setItem("name", this.name);
    console.log(localStorage);
  }

  ngAfterViewInit() {
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://www.reddit.com/r/ethereum.embed?limit=5";
    this.elementRef.nativeElement.appendChild(s);
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
          console.log("NAVIGATION START", event);
        }
        else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.loading = false;
          console.log("NAVIGATION END", event);
        }
      });


  }



  ngOnInit() {
  }

}
