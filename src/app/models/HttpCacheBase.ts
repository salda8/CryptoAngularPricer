import { HttpRequest, HttpResponse } from "@angular/common/http";
export abstract class HttpCacheBase {
  /**
   * Returns a cached response, if any, or null if not present.
   */
  public abstract get(req: HttpRequest<any>): HttpResponse<any> | null;
  /**
   * Adds or updates the response in the cache.
   */
  public abstract put(req: HttpRequest<any>, resp: HttpResponse<any>): void;
}
