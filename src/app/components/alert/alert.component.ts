import { Component, OnInit } from "@angular/core";
import { AlertService } from "../../services/alert.service";
import { Alert, AlertType } from "../../models/alert";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"]
})
export class AlertComponent implements OnInit {
  public alerts: Alert[] = [];

  public constructor(private alertService: AlertService) {}

  public ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        // clear alerts when an empty alert is received
        this.alerts = [];
        return;
      }

      // add alert to array
      this.alerts.push(alert);
    });
  }

  public removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  public cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    // tslint:disable-next-line:switch-default
    switch (alert.type) {
      case AlertType.Success:
        return "alert alert-success";
      case AlertType.Error:
        return "alert alert-danger";
      case AlertType.Info:
        return "alert alert-info";
      case AlertType.Warning:
        return "alert alert-warning";
    }
  }
}
