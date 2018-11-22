// Stores the currently-being-typechecked object for error messages.
let obj: any = null;
export class CryptoDetailsProxy {
  public readonly RAW: RAWProxy;
  public readonly DISPLAY: DISPLAYProxy;
  public static Parse(d: string): CryptoDetailsProxy {
    return CryptoDetailsProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = "root"): CryptoDetailsProxy {
    if (!field) {
      obj = d;
      field = "root";
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof d !== "object") {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    d.RAW = RAWProxy.Create(d.RAW, field + ".RAW");
    d.DISPLAY = DISPLAYProxy.Create(d.DISPLAY, field + ".DISPLAY");
    return new CryptoDetailsProxy(d);
  }
  private constructor(d: any) {
    this.RAW = d.RAW;
    this.DISPLAY = d.DISPLAY;
  }
}

export class RAWProxy {
  public readonly ETH: ETHProxy;
  public static Parse(d: string): RAWProxy {
    return RAWProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = "root"): RAWProxy {
    if (!field) {
      obj = d;
      field = "root";
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof d !== "object") {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    d.ETH = ETHProxy.Create(d.ETH, field + ".ETH");
    return new RAWProxy(d);
  }
  private constructor(d: any) {
    this.ETH = d.ETH;
  }
}

export class ETHProxy {
  public readonly USD: USDProxy;
  public static Parse(d: string): ETHProxy {
    return ETHProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = "root"): ETHProxy {
    if (!field) {
      obj = d;
      field = "root";
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof d !== "object") {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    d.USD = USDProxy.Create(d.USD, field + ".USD");
    return new ETHProxy(d);
  }
  private constructor(d: any) {
    this.USD = d.USD;
  }
}

export class USDProxy {
  public readonly TYPE: string;
  public readonly MARKET: string;
  public readonly FROMSYMBOL: string;
  public readonly TOSYMBOL: string;
  public readonly FLAGS: string;
  public readonly PRICE: number;
  public readonly LASTUPDATE: number;
  public readonly LASTVOLUME: number;
  public readonly LASTVOLUMETO: number;
  public readonly LASTTRADEID: string;
  public readonly VOLUMEDAY: number;
  public readonly VOLUMEDAYTO: number;
  public readonly VOLUME24HOUR: number;
  public readonly VOLUME24HOURTO: number;
  public readonly OPENDAY: number;
  public readonly HIGHDAY: number;
  public readonly LOWDAY: number;
  public readonly OPEN24HOUR: number;
  public readonly HIGH24HOUR: number;
  public readonly LOW24HOUR: number;
  public readonly LASTMARKET: string;
  public readonly CHANGE24HOUR: number;
  public readonly CHANGEPCT24HOUR: number;
  public readonly CHANGEDAY: number;
  public readonly CHANGEPCTDAY: number;
  public readonly SUPPLY: number;
  public readonly MKTCAP: number;
  public readonly TOTALVOLUME24H: number;
  public readonly TOTALVOLUME24HTO: number;
  public static Parse(d: string): USDProxy {
    return USDProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = "root"): USDProxy {
    if (!field) {
      obj = d;
      field = "root";
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof d !== "object") {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkString(d.TYPE, false, field + ".TYPE");
    checkString(d.MARKET, false, field + ".MARKET");
    checkString(d.FROMSYMBOL, false, field + ".FROMSYMBOL");
    checkString(d.TOSYMBOL, false, field + ".TOSYMBOL");
    checkString(d.FLAGS, false, field + ".FLAGS");
    checkNumber(d.PRICE, false, field + ".PRICE");
    checkNumber(d.LASTUPDATE, false, field + ".LASTUPDATE");
    checkNumber(d.LASTVOLUME, false, field + ".LASTVOLUME");
    checkNumber(d.LASTVOLUMETO, false, field + ".LASTVOLUMETO");
    checkString(d.LASTTRADEID, false, field + ".LASTTRADEID");
    checkNumber(d.VOLUMEDAY, false, field + ".VOLUMEDAY");
    checkNumber(d.VOLUMEDAYTO, false, field + ".VOLUMEDAYTO");
    checkNumber(d.VOLUME24HOUR, false, field + ".VOLUME24HOUR");
    checkNumber(d.VOLUME24HOURTO, false, field + ".VOLUME24HOURTO");
    checkNumber(d.OPENDAY, false, field + ".OPENDAY");
    checkNumber(d.HIGHDAY, false, field + ".HIGHDAY");
    checkNumber(d.LOWDAY, false, field + ".LOWDAY");
    checkNumber(d.OPEN24HOUR, false, field + ".OPEN24HOUR");
    checkNumber(d.HIGH24HOUR, false, field + ".HIGH24HOUR");
    checkNumber(d.LOW24HOUR, false, field + ".LOW24HOUR");
    checkString(d.LASTMARKET, false, field + ".LASTMARKET");
    checkNumber(d.CHANGE24HOUR, false, field + ".CHANGE24HOUR");
    checkNumber(d.CHANGEPCT24HOUR, false, field + ".CHANGEPCT24HOUR");
    checkNumber(d.CHANGEDAY, false, field + ".CHANGEDAY");
    checkNumber(d.CHANGEPCTDAY, false, field + ".CHANGEPCTDAY");
    checkNumber(d.SUPPLY, false, field + ".SUPPLY");
    checkNumber(d.MKTCAP, false, field + ".MKTCAP");
    checkNumber(d.TOTALVOLUME24H, false, field + ".TOTALVOLUME24H");
    checkNumber(d.TOTALVOLUME24HTO, false, field + ".TOTALVOLUME24HTO");
    return new USDProxy(d);
  }
  private constructor(d: any) {
    this.TYPE = d.TYPE;
    this.MARKET = d.MARKET;
    this.FROMSYMBOL = d.FROMSYMBOL;
    this.TOSYMBOL = d.TOSYMBOL;
    this.FLAGS = d.FLAGS;
    this.PRICE = d.PRICE;
    this.LASTUPDATE = d.LASTUPDATE;
    this.LASTVOLUME = d.LASTVOLUME;
    this.LASTVOLUMETO = d.LASTVOLUMETO;
    this.LASTTRADEID = d.LASTTRADEID;
    this.VOLUMEDAY = d.VOLUMEDAY;
    this.VOLUMEDAYTO = d.VOLUMEDAYTO;
    this.VOLUME24HOUR = d.VOLUME24HOUR;
    this.VOLUME24HOURTO = d.VOLUME24HOURTO;
    this.OPENDAY = d.OPENDAY;
    this.HIGHDAY = d.HIGHDAY;
    this.LOWDAY = d.LOWDAY;
    this.OPEN24HOUR = d.OPEN24HOUR;
    this.HIGH24HOUR = d.HIGH24HOUR;
    this.LOW24HOUR = d.LOW24HOUR;
    this.LASTMARKET = d.LASTMARKET;
    this.CHANGE24HOUR = d.CHANGE24HOUR;
    this.CHANGEPCT24HOUR = d.CHANGEPCT24HOUR;
    this.CHANGEDAY = d.CHANGEDAY;
    this.CHANGEPCTDAY = d.CHANGEPCTDAY;
    this.SUPPLY = d.SUPPLY;
    this.MKTCAP = d.MKTCAP;
    this.TOTALVOLUME24H = d.TOTALVOLUME24H;
    this.TOTALVOLUME24HTO = d.TOTALVOLUME24HTO;
  }
}

export class DISPLAYProxy {
  public readonly ETH: ETH1Proxy;
  public static Parse(d: string): DISPLAYProxy {
    return DISPLAYProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = "root"): DISPLAYProxy {
    if (!field) {
      obj = d;
      field = "root";
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof d !== "object") {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    d.ETH = ETH1Proxy.Create(d.ETH, field + ".ETH");
    return new DISPLAYProxy(d);
  }
  private constructor(d: any) {
    this.ETH = d.ETH;
  }
}

export class ETH1Proxy {
  public readonly USD: USD1Proxy;
  public static Parse(d: string): ETH1Proxy {
    return ETH1Proxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = "root"): ETH1Proxy {
    if (!field) {
      obj = d;
      field = "root";
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof d !== "object") {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    d.USD = USD1Proxy.Create(d.USD, field + ".USD");
    return new ETH1Proxy(d);
  }
  private constructor(d: any) {
    this.USD = d.USD;
  }
}

export class USD1Proxy {
  public readonly FROMSYMBOL: string;
  public readonly TOSYMBOL: string;
  public readonly MARKET: string;
  public readonly PRICE: string;
  public readonly LASTUPDATE: string;
  public readonly LASTVOLUME: string;
  public readonly LASTVOLUMETO: string;
  public readonly LASTTRADEID: string;
  public readonly VOLUMEDAY: string;
  public readonly VOLUMEDAYTO: string;
  public readonly VOLUME24HOUR: string;
  public readonly VOLUME24HOURTO: string;
  public readonly OPENDAY: string;
  public readonly HIGHDAY: string;
  public readonly LOWDAY: string;
  public readonly OPEN24HOUR: string;
  public readonly HIGH24HOUR: string;
  public readonly LOW24HOUR: string;
  public readonly LASTMARKET: string;
  public readonly CHANGE24HOUR: string;
  public readonly CHANGEPCT24HOUR: string;
  public readonly CHANGEDAY: string;
  public readonly CHANGEPCTDAY: string;
  public readonly SUPPLY: string;
  public readonly MKTCAP: string;
  public readonly TOTALVOLUME24H: string;
  public readonly TOTALVOLUME24HTO: string;
  public static Parse(d: string): USD1Proxy {
    return USD1Proxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = "root"): USD1Proxy {
    if (!field) {
      obj = d;
      field = "root";
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof d !== "object") {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkString(d.FROMSYMBOL, false, field + ".FROMSYMBOL");
    checkString(d.TOSYMBOL, false, field + ".TOSYMBOL");
    checkString(d.MARKET, false, field + ".MARKET");
    checkString(d.PRICE, false, field + ".PRICE");
    checkString(d.LASTUPDATE, false, field + ".LASTUPDATE");
    checkString(d.LASTVOLUME, false, field + ".LASTVOLUME");
    checkString(d.LASTVOLUMETO, false, field + ".LASTVOLUMETO");
    checkString(d.LASTTRADEID, false, field + ".LASTTRADEID");
    checkString(d.VOLUMEDAY, false, field + ".VOLUMEDAY");
    checkString(d.VOLUMEDAYTO, false, field + ".VOLUMEDAYTO");
    checkString(d.VOLUME24HOUR, false, field + ".VOLUME24HOUR");
    checkString(d.VOLUME24HOURTO, false, field + ".VOLUME24HOURTO");
    checkString(d.OPENDAY, false, field + ".OPENDAY");
    checkString(d.HIGHDAY, false, field + ".HIGHDAY");
    checkString(d.LOWDAY, false, field + ".LOWDAY");
    checkString(d.OPEN24HOUR, false, field + ".OPEN24HOUR");
    checkString(d.HIGH24HOUR, false, field + ".HIGH24HOUR");
    checkString(d.LOW24HOUR, false, field + ".LOW24HOUR");
    checkString(d.LASTMARKET, false, field + ".LASTMARKET");
    checkString(d.CHANGE24HOUR, false, field + ".CHANGE24HOUR");
    checkString(d.CHANGEPCT24HOUR, false, field + ".CHANGEPCT24HOUR");
    checkString(d.CHANGEDAY, false, field + ".CHANGEDAY");
    checkString(d.CHANGEPCTDAY, false, field + ".CHANGEPCTDAY");
    checkString(d.SUPPLY, false, field + ".SUPPLY");
    checkString(d.MKTCAP, false, field + ".MKTCAP");
    checkString(d.TOTALVOLUME24H, false, field + ".TOTALVOLUME24H");
    checkString(d.TOTALVOLUME24HTO, false, field + ".TOTALVOLUME24HTO");
    return new USD1Proxy(d);
  }
  private constructor(d: any) {
    this.FROMSYMBOL = d.FROMSYMBOL;
    this.TOSYMBOL = d.TOSYMBOL;
    this.MARKET = d.MARKET;
    this.PRICE = d.PRICE;
    this.LASTUPDATE = d.LASTUPDATE;
    this.LASTVOLUME = d.LASTVOLUME;
    this.LASTVOLUMETO = d.LASTVOLUMETO;
    this.LASTTRADEID = d.LASTTRADEID;
    this.VOLUMEDAY = d.VOLUMEDAY;
    this.VOLUMEDAYTO = d.VOLUMEDAYTO;
    this.VOLUME24HOUR = d.VOLUME24HOUR;
    this.VOLUME24HOURTO = d.VOLUME24HOURTO;
    this.OPENDAY = d.OPENDAY;
    this.HIGHDAY = d.HIGHDAY;
    this.LOWDAY = d.LOWDAY;
    this.OPEN24HOUR = d.OPEN24HOUR;
    this.HIGH24HOUR = d.HIGH24HOUR;
    this.LOW24HOUR = d.LOW24HOUR;
    this.LASTMARKET = d.LASTMARKET;
    this.CHANGE24HOUR = d.CHANGE24HOUR;
    this.CHANGEPCT24HOUR = d.CHANGEPCT24HOUR;
    this.CHANGEDAY = d.CHANGEDAY;
    this.CHANGEPCTDAY = d.CHANGEPCTDAY;
    this.SUPPLY = d.SUPPLY;
    this.MKTCAP = d.MKTCAP;
    this.TOTALVOLUME24H = d.TOTALVOLUME24H;
    this.TOTALVOLUME24HTO = d.TOTALVOLUME24HTO;
  }
}

function throwNull2NonNull(field: string, d: any): never {
  return errorHelper(field, d, "non-nullable object", false);
}
function throwNotObject(field: string, d: any, nullable: boolean): never {
  return errorHelper(field, d, "object", nullable);
}
function throwIsArray(field: string, d: any, nullable: boolean): never {
  return errorHelper(field, d, "object", nullable);
}
function checkNumber(d: any, nullable: boolean, field: string): void {
  if (
    typeof d !== "number" &&
    (!nullable || (nullable && d !== null && d !== undefined))
  ) {
    errorHelper(field, d, "number", nullable);
  }
}
function checkString(d: any, nullable: boolean, field: string): void {
  if (
    typeof d !== "string" &&
    (!nullable || (nullable && d !== null && d !== undefined))
  ) {
    errorHelper(field, d, "string", nullable);
  }
}
function errorHelper(
  field: string,
  d: any,
  type: string,
  nullable: boolean
): never {
  if (nullable) {
    type += ", null, or undefined";
  }
  throw new TypeError(
    "Expected " +
      type +
      " at " +
      field +
      " but found:\n" +
      JSON.stringify(d) +
      "\n\nFull object:\n" +
      JSON.stringify(obj)
  );
}
