import { ErrorHandler, Injectable, Injector, Type } from "@angular/core";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { ConsoleLoggerService } from "./services/logger.service";
import * as StackTrace from "stacktrace-js";
import { AlertService } from "./services/alert.service";

@Injectable({
  providedIn: "root"
})
export class GlobalErrorHandler implements ErrorHandler {
  public constructor(private injector: Injector) {}
  public handleError(error: any): void {
    const loggingService: ConsoleLoggerService = this.injector.get(
      ConsoleLoggerService
    );
    const alertService: AlertService = this.injector.get(AlertService);
    const location: LocationStrategy = this.injector.get<LocationStrategy>(
      LocationStrategy as Type<LocationStrategy>
    );
    const message: string = error.message ? error.message : error.toString();
    const url: string =
      location instanceof PathLocationStrategy ? location.path() : "";
    // get the stack trace, lets grab the last 10 stacks only
    StackTrace.fromError(error).then(stackframes => {
      const stackString: string = stackframes
        .splice(0, 20)
        .map((sf: any) => {
          return sf.toString();
        })
        .join("\n");
      // log on the server
      alertService.error(message, false);
      loggingService.log({ message, url, stack: stackString });
    });
    // throw error;
  }

  public handleAndAlert(error: Error, uiMessage?: string): void {
    const loggingService: ConsoleLoggerService = this.injector.get(
      ConsoleLoggerService
    );
    const alertService: AlertService = this.injector.get(AlertService);
    const location: LocationStrategy = this.injector.get<LocationStrategy>(
      LocationStrategy as Type<LocationStrategy>
    );
    const message: string = error.message ? error.message : error.toString();
    const url: string =
      location instanceof PathLocationStrategy ? location.path() : "";
    // get the stack trace, lets grab the last 10 stacks only
    StackTrace.fromError(error).then(stackframes => {
      const stackString: string = stackframes
        .splice(0, 20)
        .map(
          (sf: any): string => {
            return sf.toString();
          }
        )
        .join("\n");
      // log on the server
      alertService.error(uiMessage ? uiMessage : error.message, false);
      loggingService.log({ message, url, stack: stackString });
    });
  }
}
