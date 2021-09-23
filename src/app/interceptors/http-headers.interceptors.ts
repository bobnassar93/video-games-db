import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // req = req.clone(
    //   {
    //     setHeaders: {
    //       'x-rawgapi-key': '401afdc1d8904132848baefd09ef6ddb',
    //       'x-rawgapi-host': 'https://api.rawg.io/api/'
    //     },
    //     setParams: {
    //       key: '401afdc1d8904132848baefd09ef6ddb'
    //     }
    //   }
    // );
    return next.handle(req);
  }
}
