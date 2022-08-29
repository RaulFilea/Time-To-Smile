import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm?.valid) {
      const credentials = {
        username: this.loginForm?.value.username,
        password: this.loginForm?.value.password
      };
      this.loginService.login(credentials).subscribe({
        next: () => {
          this.router.navigateByUrl('/home_doc');
        },
        error: () => {
          alert(`Invalid username or password!`);
        },
      });
    } else {
      alert('Invalid username or password');
    }
  }
}
