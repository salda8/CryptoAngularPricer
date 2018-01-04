import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";
import { PriceDetails } from "../models/pricedetailed";
import { MessageService } from "../models/message-service";

@Injectable()
export class ContinousPriceUpdatesMessageService implements MessageService<PriceDetails> {
  private subject = new Subject<PriceDetails>();

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
