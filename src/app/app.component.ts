import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'school';
  status = true;

  ngOnInit() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('auth-token');
    console.log("UID", token);
    console.log("UID is expired: ", helper.isTokenExpired(token));
    if (helper.isTokenExpired(token)) {
      this.status = false;
      localStorage.clear();

    }
  }
}
