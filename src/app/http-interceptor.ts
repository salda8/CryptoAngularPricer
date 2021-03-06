import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalErrorHandler } from "./global-error-handler";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: "body";
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: "json";
  withCredentials?: boolean;
  body?: any;
}

@Injectable({
  providedIn: "root"
})
export class ApplicationHttpClient {
  public proxy: string = "https://cors-anywhere.herokuapp.com/";
  public baseUrl: string = "";
  public useProxy = false;

  private api = this.useProxy ? `${this.proxy}${this.baseUrl}` : this.baseUrl;

  // extending the HttpClient through the Angular DI.
  public constructor(
    public http: HttpClient,
    private errorHandler: GlobalErrorHandler
  ) {
    // if you don't want to use the extended versions in some cases you can access the public property and use the original one.
    // for ex. this.httpClient.http.get(...)
  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http
      .get<T>(this.api + endPoint, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public post<T>(
    endPoint: string,
    params: object,
    options?: IRequestOptions
  ): Observable<T> {
    return this.http
      .post<T>(this.api + endPoint, params, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public put<T>(
    endPoint: string,
    params: object,
    options?: IRequestOptions
  ): Observable<T> {
    return this.http
      .put<T>(this.api + endPoint, params, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http
      .delete<T>(this.api + endPoint, options)
      .pipe(catchError(this.handleError));
  }

  private handleError = (error: Response) => {
    // do messaging and error handling here
    this.errorHandler.handleError(error);
    return Observable.throw(error);
  }
}

export function applicationHttpClientCreator(
  http: HttpClient,
  errorHandler: GlobalErrorHandler
): ApplicationHttpClient {
  return new ApplicationHttpClient(http, errorHandler);
}
