// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private router: Router) {}

  onLogin() {
    // Lógica simplificada para redirigir siempre al menú
    this.router.navigate(['/menu']);
  }
}
