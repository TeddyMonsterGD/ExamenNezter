import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  login: string = '';
  password: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {

    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onLogin() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(response => {
        if (response.success) {
          this.router.navigate(['/menu']);
        } else {
          alert('Login failed. Please check your credentials.');
        }
      });
    }
  }
}