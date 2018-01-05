import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sortByPipe"
})
export class SortByPipePipe implements PipeTransform {

  transform(array: Array<string>, args: string): Array<string> {
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

  sort(input: Object[], attribute: string, direction: "asc" | "desc") {
    let array = [];
    for (let objectKey of input) {
      array.push(objectKey);
    }

    console.log(array);
    console.log(attribute);

    array.sort(function (a, b) {
      a = parseInt(a[attribute]);
      //console.log(a[attribute]);
      b = parseInt(b[attribute]);
      // console.log(b[attribute]);
      return direction ? a - b : b - a;
    });
    return array;
  }

}
