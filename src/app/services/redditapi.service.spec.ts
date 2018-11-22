import { TestBed, inject } from "@angular/core/testing";

import { RedditapiService } from "./redditapi.service";

describe("RedditapiService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedditapiService]
    });
  });

  it("should be created", inject(
    [RedditapiService],
    (service: RedditapiService) => {
      expect(service).toBeTruthy();
    }
  ));
});
