export interface PriceDetailed {
    RAW: RAW;
    DISPLAY: DISPLAY;
}


export interface RAW {
    ETH: ETH[];
}
export interface ETH {
    USD: PriceDetails;
}

export class GraphLine {
    name: string;
    series: GraphSeries[];

    constructor(name: string, series: GraphSeries[]) {
        this.name = name;

        this.series = series;
    }
}

export class GraphSeries {
    name: Date;
    value: number;
    constructor(name: Date, value: number) {
        this.name = name;
        this.value = value;

    }

}

export interface PriceDetails {
    TYPE: string;
    MARKET: string;
    FROMSYMBOL: string;
    TOSYMBOL: string;
    FLAGS: string;
    PRICE: number;
    LASTUPDATE: number;
    LASTVOLUME: number;
    LASTVOLUMETO: number;
    LASTTRADEID: string;
    VOLUMEDAY: number;
    VOLUMEDAYTO: number;
    VOLUME24HOUR: number;
    VOLUME24HOURTO: number;
    OPENDAY: number;
    HIGHDAY: number;
    LOWDAY: number;
    OPEN24HOUR: number;
    HIGH24HOUR: number;
    LOW24HOUR: number;
    LASTMARKET: string;
    CHANGE24HOUR: number;
    CHANGEPCT24HOUR: number;
    CHANGEDAY: number;
    CHANGEPCTDAY: number;
    SUPPLY: number;
    MKTCAP: number;
    TOTALVOLUME24H: number;
    TOTALVOLUME24HTO: number;
    DATEWHENRECEIVED: Date;

    NAME: string;
}
export interface DISPLAY {
    ETH: ETH1;
}
export interface ETH1 {
    USD: USD1;
}
export interface USD1 {
    FROMSYMBOL: string;
    TOSYMBOL: string;
    MARKET: string;
    PRICE: string;
    LASTUPDATE: string;
    LASTVOLUME: string;
    LASTVOLUMETO: string;
    LASTTRADEID: string;
    VOLUMEDAY: string;
    VOLUMEDAYTO: string;
    VOLUME24HOUR: string;
    VOLUME24HOURTO: string;
    OPENDAY: string;
    HIGHDAY: string;
    LOWDAY: string;
    OPEN24HOUR: string;
    HIGH24HOUR: string;
    LOW24HOUR: string;
    LASTMARKET: string;
    CHANGE24HOUR: string;
    CHANGEPCT24HOUR: string;
    CHANGEDAY: string;
    CHANGEPCTDAY: string;
    SUPPLY: string;
    MKTCAP: string;
    TOTALVOLUME24H: string;
    TOTALVOLUME24HTO: string;
}



