import { Observable } from "rxjs";

export interface MessageService<T> {
  sendMessage(message: T);

  clearMessage();

  getMessage(): Observable<T>;
}
