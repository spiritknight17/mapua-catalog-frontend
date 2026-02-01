import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login.css'
})
//Placeholder for API calling of login
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  error = signal<string | null>(null);
  onSubmit(event: Event) {
    event.preventDefault();
    this.error.set(null);
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const email = String(data.get('Email') || '');
    const password = String(data.get('Password') || '');
    this.auth.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/mc-board']);
      },
      error: (err) => {
        this.error.set(err?.message ?? 'Invalid credentials');
      }
    });
  }
}