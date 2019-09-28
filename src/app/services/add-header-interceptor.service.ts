import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddHeaderInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const jwt = new JwtHelperService();
    var token = localStorage.getItem('auth-token');
    if (token == null) {
      token = "token"
    }
    const clonedRequest = req.clone({ headers: req.headers.set('auth-token', token) });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }

  constructor() { }
}
