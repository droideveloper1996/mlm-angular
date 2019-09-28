import { AuthService } from './../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuardService implements CanActivate {

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {


    if (this.auth.getAuthenticationStatus()) {
      return true;
    }
    else {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: state.url,
          loginFor: 'office'
        }
      });
      return false;
    }
    return false;
  }

  constructor(private auth: AuthService, private router: Router) { }
}
