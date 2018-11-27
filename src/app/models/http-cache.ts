import { HttpRequest, HttpResponse } from "@angular/common/http";
import { HttpCacheBase } from "./HttpCacheBase";

export class HttpCache implements HttpCacheBase {
  public get(req: HttpRequest<any>): HttpResponse<any> {
    throw new Error("Method not implemented.");
  }
  public put(req: HttpRequest<any>, resp: HttpResponse<any>): void {
    throw new Error("Method not implemented.");
  }
}
