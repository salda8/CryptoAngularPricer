import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { Observable, Subject } from "rxjs";

import { Alert, AlertType } from "../models/alert";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  public constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  public getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  public success(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Success, message, keepAfterRouteChange);
  }

  public error(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Error, message, keepAfterRouteChange);
  }

  public info(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Info, message, keepAfterRouteChange);
  }

  public warn(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Warning, message, keepAfterRouteChange);
  }

  public alert(type: AlertType, message: string, keepAfterRouteChange = false) {
    if (type !== AlertType.NoAlert) {
      this.keepAfterRouteChange = keepAfterRouteChange;
      this.subject.next({ type, message } as Alert);
    }
  }

  public clear() {
    // clear alerts
    this.subject.next();
  }
}
