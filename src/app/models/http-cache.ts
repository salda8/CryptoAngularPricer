import { HttpRequest, HttpResponse } from "@angular/common/http";



export abstract class HttpCacheBase {
    /**
     * Returns a cached response, if any, or null if not present.
     */
    abstract get(req: HttpRequest<any>): HttpResponse<any> | null;

    /**
     * Adds or updates the response in the cache.
     */
    abstract put(req: HttpRequest<any>, resp: HttpResponse<any>): void;
}

export class HttpCache implements HttpCacheBase {
    get(req: HttpRequest<any>): HttpResponse<any> {
        throw new Error("Method not implemented.");
    }
    put(req: HttpRequest<any>, resp: HttpResponse<any>): void {
        throw new Error("Method not implemented.");
    }

}
