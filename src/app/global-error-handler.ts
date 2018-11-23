import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { ConsoleLoggerService } from "./services/logger.service";
import * as StackTrace from "stacktrace-js";
import { AlertService } from "./services/alert.service";

@Injectable({
  providedIn: "root"
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}
  handleError(error) {
    const loggingService = this.injector.get(ConsoleLoggerService);
    const alertService = this.injector.get(AlertService);
    const location = this.injector.get(LocationStrategy);
    const message = error.message ? error.message : error.toString();
    const url = location instanceof PathLocationStrategy ? location.path() : "";
    // get the stack trace, lets grab the last 10 stacks only
    StackTrace.fromError(error).then(stackframes => {
      const stackString = stackframes
        .splice(0, 20)
        .map(function(sf) {
          return sf.toString();
        })
        .join("\n");
      // log on the server
      alertService.error(message, false);
      loggingService.log({ message, url, stack: stackString });
    });
    // throw error;
  }

  handleAndAlert(error: Error, uiMessage?: string) {
    const loggingService = this.injector.get(ConsoleLoggerService);
    const alertService = this.injector.get(AlertService);
    const location = this.injector.get(LocationStrategy);
    const message = error.message ? error.message : error.toString();
    const url = location instanceof PathLocationStrategy ? location.path() : "";
    // get the stack trace, lets grab the last 10 stacks only
    StackTrace.fromError(error).then(stackframes => {
      const stackString = stackframes
        .splice(0, 20)
        .map(function(sf) {
          return sf.toString();
        })
        .join("\n");
      // log on the server
      alertService.error(uiMessage ? uiMessage : error.message, false);
      loggingService.log({ message, url, stack: stackString });
    });
  }
}
