import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as io from "socket.io-client";
import { subscribeOn } from "rxjs/operator/subscribeOn";
import { TYPE, StreamerUtils } from "../../ccc-streamer-utilities";
import { CryptoPricesService } from "../../services/crypto-prices.service";
import { Trade } from "../../models/trade";

@Component({
  selector: "app-crypto-streamer",
  templateUrl: "./crypto-streamer.component.html",
  styleUrls: ["./crypto-streamer.component.css"]
})
export class CryptoStreamerComponent implements OnInit {
  service: CryptoPricesService;
  fsym: string = "BTC";
  tsym: string = "USD";
  columnNames = ["Market",
    "Type",
    "ID",
    "Price",
    "Quantity",
    "Total"];
  trades: Trade[] = [];
  currentSubs;
  private socket: SocketIOClient.Socket;
  private streamerUtils: StreamerUtils = StreamerUtils.prototype;


  constructor(service: CryptoPricesService, private route: ActivatedRoute) {
    this.socket = io.connect("https://streamer.cryptocompare.com/");
    this.service = service;
    this.route = route;


  }

  ngOnInit() {
    console.log(this.route.snapshot);
    this.tsym = this.route.snapshot.queryParams["currency"];
    this.fsym = this.route.snapshot.queryParams["ticker"];

  }
  displayData(trade: any) {
    let maxTableSize = 30;
  }
  unsubscribe() {
    this.socket.emit("SubRemove", { subs: this.currentSubs });
    this.socket.disconnect();
  }
  subscribe() {
    this.getSubs();



  }




  private getSubs() {
    this.service.getData(this.fsym, this.tsym).subscribe(msg => {
      // console.log(msg);
      let possibleSubs = msg[this.tsym]["TRADES"];
      this.currentSubs = possibleSubs;
      // console.log(this.currentSubs);
      this.subscribeandproceess();
      // return possibleSubs;

    });

  }
  private transformReceivedData = function (data: string) {
    if (data.length === 1) return;
    // console.log("Transforming data:", data);
    let coinfsym = this.streamerUtils.getSymbol(this.fsym);
    let cointsym = this.streamerUtils.getSymbol(this.tsym);
    let incomingTrade = this.streamerUtils.unpack(data);

    let newTrade: Trade = {
      Market: incomingTrade["M"],
      Type: incomingTrade["T"],
      ID: incomingTrade["ID"],
      Price: this.streamerUtils.current_convertValueToDisplay(cointsym, incomingTrade["P"]),
      Quantity: this.streamerUtils.current_convertValueToDisplay(coinfsym, incomingTrade["Q"]),
      Total: this.streamerUtils.current_convertValueToDisplay(cointsym, incomingTrade["TOTAL"])
    };

    if (incomingTrade["F"] & 1) {
      newTrade["Type"] = "SELL";
    }
    else if (incomingTrade["F"] & 2) {
      newTrade["Type"] = "BUY";
    }
    else {
      newTrade["Type"] = "UNKNOWN";
    }

    this.trades.push(newTrade);
    // console.log("NEW TRADE: ", newTrade);

  };
  private Process(message: string) {
    let messageType = message.substring(0, message.indexOf("~"));
    console.log("RECEIVED MSG: ", message);

    console.log("MSG TYPE:", messageType);
    if (+messageType === TYPE.TRADE) {
      this.transformReceivedData(message);
    }
  }

  private subscribeandproceess() {
    console.log(this.currentSubs);
    this.socket.emit("SubAdd", { subs: this.currentSubs });
    this.socket.on("m", message => this.Process(message));
  }
}





