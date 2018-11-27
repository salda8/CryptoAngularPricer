// To parse this data:
//
//   import { Convert, CoinListResponse } from "./file";
//
//   const coinListResponse = Convert.toCoinListResponse(json);

export interface CoinListResponse {
  Response: string;
  Message: string;
  BaseImageUrl: string;
  BaseLinkUrl: string;
  DefaultWatchlist: DefaultWatchlist;
  Data: { [key: string]: CoinInfo };
  Type: number;
  DataMap: Map<string, string>;
}

export interface CoinInfo {
  Id: string;
  Url: string;
  ImageUrl?: string;
  Name: string;
  Symbol: string;
  CoinName: string;
  FullName: string;
  Algorithm: string;
  ProofType: string;
  FullyPremined: string;
  TotalCoinSupply: string;
  PreMinedValue: string;
  TotalCoinsFreeFloat: string;
  SortOrder: string;
  Sponsored: boolean;
}

export interface DefaultWatchlist {
  CoinIs: string;
  Sponsored: string;
}

// Converts JSON strings to/from your types
export namespace Convert {
  export function toCoinListResponse(json: string): CoinListResponse {
    return JSON.parse(json);
  }

  export function coinListResponseToJson(value: CoinListResponse): string {
    return JSON.stringify(value, undefined, 2);
  }
}
