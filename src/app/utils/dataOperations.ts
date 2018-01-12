
export function countDecimals(value: number): number {

    // tslint:disable-next-line:triple-equals
    if (Math.floor(value) == value) {
        return 0;
    }

    console.log(Math.floor(value), "=", value);
    return value.toString().split(".")[1].length || 0;

}

export function round(value: number, precision: number): number {
    let multiplier: number = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
