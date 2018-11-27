import { Injectable } from "@angular/core";
import { PriceDetails } from "../models/pricedetailed";

@Injectable()
export class CryptoDetailTempStorageService {
  private priceDetails: PriceDetails;

  public save(pd: PriceDetails) {
    this.priceDetails = pd;
  }

  public load(): PriceDetails {
    return this.priceDetails;
  }
}
