import { Pipe, PipeTransform } from "@angular/core";
import { TakePipe } from "angular-pipes";

@Pipe({
  name: "app-sortByPipe"
})
export class SortByPipePipe implements PipeTransform {
  public transform(array: string[], args: string): string[] {
    array.sort((a: any, b: any) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

  public sort(input: Object[], attribute: string, direction: "asc" | "desc") {
    let array = [];
    for (let objectKey of input) {
      array.push(objectKey);
    }

    array.sort(function(a, b) {
      a = parseInt(a[attribute], 10);
      b = parseInt(b[attribute], 10);
      return direction === "desc" ? a - b : b - a;
    });

    return TakePipe.prototype.transform(array);
  }

  public sortAndTakeTopX(
    input: Object[],
    attribute: string,
    direction: "asc" | "desc",
    objectsToTake: number
  ) {
    return TakePipe.prototype.transform(
      this.sort(input, attribute, direction),
      objectsToTake
    );
  }
}
