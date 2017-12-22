import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";
import { PriceDetails } from "../models/pricedetailed";

@Injectable()
export class PriceDetailsMessageService {
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
