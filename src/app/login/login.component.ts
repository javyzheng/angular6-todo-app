import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { Auth } from '../domain/entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  auth: Auth;

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(formValue) {
    this.service
      .loginWithCredentials(formValue.login.username, formValue.login.password)
      .then(auth => {
        let redirectUrl = (auth.redirectUrl === null)? '/' : auth.redirectUrl;
        if(!auth.hasError) {
          this.router.navigate(['todo']);
          localStorage.removeItem('redirectUrl');
        } else {
          this.auth = Object.assign({}, auth);
        }
      });
  }

}
