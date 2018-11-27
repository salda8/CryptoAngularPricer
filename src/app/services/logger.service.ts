import { Injectable } from "@angular/core";

import { Logger } from "../models/logger";
import { AlertService } from "./alert.service";

export let isDebugMode = true;

const noop = (): any => undefined;

@Injectable({
  providedIn: "root"
})
export class ConsoleLoggerService implements Logger {
  /**
   *
   */
  public constructor(private alertService: AlertService) {}

  public log(arg0: any) {
    this.invokeConsoleMethod("error", arg0);
  }

  public get info() {
    if (isDebugMode) {
      return console.info.bind(console);
    } else {
      return noop;
    }
  }

  public get warn() {
    if (isDebugMode) {
      return console.warn.bind(console);
    } else {
      return noop;
    }
  }

  public get error() {
    if (isDebugMode) {
      return console.error.bind(console);
    } else {
      return noop;
    }
  }

  public invokeConsoleMethod(type: string, args?: any): void {
    const logFn: Function = console[type] || console.log || noop;
    logFn.apply(console, [args]);
  }
}
