import { Component, OnInit } from "@angular/core";
import { routes } from "../../app-routing.module";
import { RouterModule, Route } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]

})
export class HomeComponent implements OnInit {


  title: string;



  constructor() {
    this.title = "app";



  }



  ngOnInit() {
  }

}
