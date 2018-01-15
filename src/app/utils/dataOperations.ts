
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

export function median(numbers) {
    // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
    let median = 0, numsLen = numbers.length;
    numbers.sort();

    if (
        numsLen % 2 === 0 // is even
    ) {
        // average of two middle numbers
        median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
    } else { // is odd
        // middle number only
        median = numbers[(numsLen - 1) / 2];
    }

    return median;
}
