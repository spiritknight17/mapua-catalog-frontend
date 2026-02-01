import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //Placeholder for API calling of login
  login(email: string, password: string): Observable<unknown> {
    const isValid = email.trim() === 'user@example.com' && password.trim() === 'password123';
    if (isValid) {
      return of({ ok: true }).pipe(delay(150));
    }
    return throwError(() => new Error('Invalid Credentials!')).pipe(delay(150));
  }
}