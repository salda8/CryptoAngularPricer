import { InMemoryDbService } from "angular-in-memory-web-api";

export class PriceDetailsData implements InMemoryDbService {
  public createDb() {
      let books = [
            { id: 1, name: "Core Java" },
            { id: 2, name: "Angular 2" },
            { id: 3, name: "Hibernate" }
        ];
      return { books };
    }

}
