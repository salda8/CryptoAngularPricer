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
  constructor(private alertService: AlertService) {}

  log(arg0: any) {
    this.invokeConsoleMethod("error", arg0);
  }

  get info() {
    if (isDebugMode) {
      return console.info.bind(console);
    } else {
      return noop;
    }
  }

  get warn() {
    if (isDebugMode) {
      return console.warn.bind(console);
    } else {
      return noop;
    }
  }

  get error() {
    if (isDebugMode) {
      return console.error.bind(console);
    } else {
      return noop;
    }
  }

  invokeConsoleMethod(type: string, args?: any): void {
    const logFn: Function = console[type] || console.log || noop;
    logFn.apply(console, [args]);
  }
}
