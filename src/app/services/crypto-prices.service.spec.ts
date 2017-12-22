import { TestBed, inject } from '@angular/core/testing';

import { CryptoPricesServiceService } from './crypto-prices-service.service';

describe('CryptoPricesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoPricesServiceService]
    });
  });

  it('should be created', inject([CryptoPricesServiceService], (service: CryptoPricesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
