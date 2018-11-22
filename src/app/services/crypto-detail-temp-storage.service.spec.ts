import { TestBed, inject } from "@angular/core/testing";

import { CryptoDetailTempStorageService } from "./crypto-detail-temp-storage.service";

describe("CryptoDetailTempStorageService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoDetailTempStorageService]
    });
  });

  it("should be created", inject(
    [CryptoDetailTempStorageService],
    (service: CryptoDetailTempStorageService) => {
      expect(service).toBeTruthy();
    }
  ));
});
