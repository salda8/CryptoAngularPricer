import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { AlertService } from "../../services/alert.service";
import { GlobalErrorHandler } from "../../global-error-handler";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private errorHandler: GlobalErrorHandler,
    private alertService: AlertService) { }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        this.alertService.success("Registration successful", true);
        this.router.navigate(["/login"]);
      },
      error => {
        this.errorHandler.handleAndAlert(error);
        this.loading = false;
      });
  }
}
