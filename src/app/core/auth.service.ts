import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../user/user.service';
import { Auth } from '../domain/entities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http, private userService: UserService) { }

  loginWithCredentials(username: string, password: string): Promise<Auth> {
    return this.userService
      .findUser(username)
      .then(user => {
        let auth = new Auth();
        localStorage.removeItem('userId');
        let redirectUrl = (localStorage.getItem('redirectUrl') === null) ? '/' : localStorage.getItem('redirectUrl');
        auth.redirectUrl = redirectUrl;
        if(null === user) {
          auth.hasError = true;
          auth.errMsg = 'user not found';
        } else if (password === user.password) {
          auth.user = Object.assign({}, user);
          auth.hasError = false;
          localStorage.setItem('userId', user.id.toString());
        } else {
          auth.hasError = true;
          auth.errMsg = 'password not match';
        }
        return auth;
      })
      .catch(this.handleError);
      
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
