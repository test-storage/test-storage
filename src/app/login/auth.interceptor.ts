import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { contentHeaders } from './headers';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storageService: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('/api/')) {
      // Get the auth token from the service.
      const authToken = this.storageService.getToken();

      // Set content headers
      let headers = contentHeaders;
      headers = contentHeaders.set('Authorization', `Bearer ${authToken}`);

      // Clone the request to add the new header.
      const authReq = req.clone({ headers: headers });
      // Pass on the cloned request instead of the original request.
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
