import { Injectable } from '@angular/core';
import { LoginCredentials, User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedUser: User | undefined;
  redirectUrl: string | undefined;

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<User> {
    return this.http
      .post<User>(environment.backendURL + '/login', credentials)
      .pipe(
        tap((user) => {
          this.loggedUser = user;
          sessionStorage.setItem('username', user.username);
          sessionStorage.setItem('logged', this.loggedIn().toString());
        })
      );
  }

  loggedIn(): boolean {
    return this.loggedUser !== undefined || sessionStorage.getItem('logged') == 'true';
  }
}
