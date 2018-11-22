import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PriceDetails } from "../models/pricedetailed";
import { MessageService } from "../models/message-service";

@Injectable()
export class PriceUpdateService implements MessageService<PriceDetails> {
  private subject = new Subject<any>();

  sendMessage(message: PriceDetails) {
    this.subject.next(message);
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<PriceDetails> {
    return this.subject.asObservable();
  }
}
