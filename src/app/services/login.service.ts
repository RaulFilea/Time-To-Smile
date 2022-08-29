import { Injectable } from '@angular/core';
import {LoginCredentials, User, UserRoles} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedUser: User | undefined;
  redirectUrl: string | undefined;

  constructor(private http: HttpClient) {
  }

  login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<User>(environment.backendURL + '/login', credentials).pipe(tap((user) => {
      this.loggedUser = user;
      localStorage.setItem("username", user.username);
      localStorage.setItem("logged", this.loggedIn().toString());
    }));
  }

  loggedIn(): boolean {
    return this.loggedUser !== undefined;
  }

  hasRoleType(role: string) {
    if (this.loggedUser?.roles.includes(<UserRoles>role))
      return true;
    return false;
  }
}
