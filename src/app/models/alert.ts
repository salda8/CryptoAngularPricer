export class Alert {
  public type: AlertType;
  public message: string;

}

export function logLevelToAlertType(type: string): AlertType {
  switch (type) {
      case "want":
        return AlertType.Warning;
      case "error":
        return AlertType.Error;
      default:
        return AlertType.NoAlert;

    }
}

export enum AlertType {
    NoAlert,
    Success,

    Error,

    Info,

    Warning

}
