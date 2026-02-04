import { Component, inject, signal, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login.css'
})
//Placeholder for API calling of login
export class LoginPage {
  loginObj: any = {
    username: '',
    password: ''
  };
  constructor(private authService: AuthService, private router: Router){}
  onLogin(){
    this.authService.onLogin(this.loginObj).subscribe((res: any) => {
      debugger
      console.log('res', res)
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('refresh_token', res.refresh_token);
      this.router.navigateByUrl('/mc-board');
    })
  }

  /*formbuilder = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);
  logInForm =   this.formbuilder.nonNullable.group({
    Email: ['', Validators.required],
    Password: ['', Validators.required],
  });
  error: string | null = null;
  onSubmit(){
    const rawFormValue = this.logInForm.getRawValue();
    this.authService.login(rawFormValue.Email, rawFormValue.Password).subscribe((result) =>{
      if (result.error){
        this.error.set(err?.message ?? 'Invalid credentials');
      }else {
        this.authService.supabase.auth.onAuthStateChange((event) => {

        })
        this.router.navigate(['/mc-board']);
      }
    });
  }

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
  }*/
}