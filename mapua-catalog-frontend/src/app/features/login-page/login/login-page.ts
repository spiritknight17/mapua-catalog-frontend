import { Component, inject, signal, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
//Placeholder for API calling of login
@Injectable()
export class LoginPage {
  http = inject(HttpClient);
  router = inject(Router);
  error = signal<string | null>(null);
  loginObj: any = {
    username: '',
    password: '',
  };
  /*constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    request = request.clone({headers: request.headers.set('Authorization', 'bearer' + access_token + refresh_token)});
    return next.handle(request);
  }*/
  onLogin() {
    this.error.set(null);
    const body = new HttpParams()
      .set('username', this.loginObj.username)
      .set('password', this.loginObj.password)
      .set('grant_type', 'password');

    this.http
      .post<any>('http://localhost:8000/rest/login', body.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .subscribe({ 
        next: (res) =>{
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
          this.router.navigateByUrl('/kanban-board');
        },
        error: (err) => {
          console.error('Login Failed!', err);
          if (err.status === 401){
            this.error.set('Invalid Credentials!');
          }
        }
      });
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
