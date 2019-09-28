import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  isCollapsed = true;
  student
  teacher
  office
  username;
  role
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.authService.getAuthenticationStatus()
    const helper = new JwtHelperService();
    const token = localStorage.getItem('auth-token');
    this.username = helper.decodeToken(token).fname;
    this.role = helper.decodeToken(token).role;
    console.log(helper.decodeToken(token))
    this.isLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('auth-token');
    this.isLoggedIn = false;
    this.router.navigate(['/login'], {
      queryParams: {
        login: 'office'
      }
    });
  }

  // isLoggedIn() {

  //   return this.authService.getAuthenticationStatus();
  // }

}
