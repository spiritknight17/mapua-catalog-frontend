import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  canActivate: CanActivateFn = (route, state) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    }
    const router = inject(Router);
    router.navigate([''], {queryParams: { returnUrl: state.url}});
    return false;
  };
}
