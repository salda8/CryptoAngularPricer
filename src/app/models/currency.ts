export class Currency {
  public name: string;
  public selected: boolean;
  public id: number;

  public constructor(name: string, id: number, selected: boolean = false) {
    this.id = id;
    this.name = name;
    this.selected = selected;
  }
}
