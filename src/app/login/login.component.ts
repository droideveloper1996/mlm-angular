import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  placeholder = 'Login Id';
  errorOccured = false;
  hasErrorOccured: boolean = false;
  loginClicked = false
  constructor(private authservice: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

  }

  submitLogin(loginDetails) {
    this.loginClicked = true;
    const queryParam = this.route.snapshot.queryParamMap.get('login');
    const payload = loginDetails.value;
    if (queryParam === 'office') {
      this.loginOffice(payload);
    }
  }

  loginOffice(payload) {
    console.log("LoginPayload", payload);

    this.authservice.authenticateOffice(payload).subscribe(res => {
      console.log(res);
      if (res) {
        // this.router.navigateByUrl('/MainNavComponent').then(() =>
        //   this.router.navigate(["/office/dashboard"]));
        window.location.href = "/#/office/dashboard"

        //this.router.navigate([''])
      }

    }, error => {
      this.hasErrorOccured = true;
      this.errorOccured = error.error.message
      console.log(error.error.message)
      this.loginClicked = false;
    })

  }
  close() {
    this.hasErrorOccured = false;
    this.loginClicked = false;

  }
}
