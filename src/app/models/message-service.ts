import { Observable } from "rxjs/Observable";

export interface MessageService<T> {
    sendMessage(message: T);

    clearMessage();

    getMessage(): Observable<T>;
}

