import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username
  hindiMediumTotal
  presentHindiMediumStudents
  englishMediumTotal
  presentEnglishMediumStudents
  constructor() { }

  ngOnInit() {
    const jwthelper = new JwtHelperService();
    const token = localStorage.getItem('auth-token');
    this.username = jwthelper.decodeToken(token).fname;
  }

}
