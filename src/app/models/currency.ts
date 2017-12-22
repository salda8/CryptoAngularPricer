export class Currency {
    name: string;
    selected: boolean;
    id: number;

    constructor(name: string, id: number, selected: boolean = false, ) {
        this.id = id;
        this.name = name;
        this.selected = selected;
    }


}
