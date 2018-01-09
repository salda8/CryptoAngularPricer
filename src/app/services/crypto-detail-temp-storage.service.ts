import { Injectable } from '@angular/core';
import { PriceDetails } from '../models/pricedetailed';

@Injectable()
export class CryptoDetailTempStorageService {

  private priceDetails: PriceDetails;

  constructor() { }

  save(pd: PriceDetails) {
    this.priceDetails = pd;
  }

  load(): PriceDetails {
    return this.priceDetails;

  }



}
