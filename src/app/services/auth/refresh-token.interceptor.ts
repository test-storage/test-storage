import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { contentHeaders } from './headers';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private storageService: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('/authentication/refresh')) {
      // Get the refresh token from the service.
      const refreshToken = this.storageService.getRefreshToken();

      // Set content headers
      let headers = contentHeaders;
      headers = contentHeaders.set('x-refresh-token', refreshToken);

      // Clone the request to add the new header.
      const refreshReq = req.clone({ headers: headers });
      // Pass on the cloned request instead of the original request.
      return next.handle(refreshReq);
    } else {
      return next.handle(req);
    }
  }
}
