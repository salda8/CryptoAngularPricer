import { PriceDetails } from "./pricedetailed";

// To parse this data:
//
//   import { Convert, CoinSnapshot } from "./file";
//
//   const coinSnapshot = Convert.toCoinSnapshot(json);

export interface CoinSnapshot {
    Response: string;
    Message: string;
    Data: Data;
    Type: number;
}

export interface Data {
    Algorithm: string;
    ProofType: string;
    BlockNumber: number;
    NetHashesPerSecond: number;
    TotalCoinsMined: number;
    BlockReward: number;
    AggregatedData: AggregatedData;
    Exchanges: ExchangeCoinSnapshot[];
}

export interface AggregatedData {
    TYPE: string;
    MARKET: string;
    FROMSYMBOL: string;
    TOSYMBOL: string;
    FLAGS: string;
    PRICE: number;
    LASTUPDATE: string;
    LASTVOLUME: string;
    LASTVOLUMETO: string;
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
}

export interface ExchangeCoinSnapshot {
    TYPE: string;
    MARKET: string;
    FROMSYMBOL: string;
    TOSYMBOL: string;
    FLAGS: string;
    LASTTRADEID: string;
    LASTUPDATE: string;
    PRICE: number;
    LASTVOLUME: number;
    LASTVOLUMETO: number;

    VOLUME24HOUR: number;
    VOLUME24HOURTO: number;
    OPEN24HOUR: number;
    HIGH24HOUR: number;
    LOW24HOUR: number;
}

// Converts JSON numbers to/from your types
export class Convert {
    toCoinSnapshot(json: string): CoinSnapshot {
        return JSON.parse(json);
    }

    coinSnapshotToJson(value: CoinSnapshot): string {
        return JSON.stringify(value, undefined, 2);
    }
}
