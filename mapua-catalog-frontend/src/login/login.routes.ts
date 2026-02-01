import { Routes } from '@angular/router';
import { LoginPage } from './login-page';
import { McBoard } from '../mc-board/mc-board';
import { ForgotPassword } from '../forgot-password/forgot-password';

export const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'mc-board', component: McBoard },
  { path: 'forgot-password', component: ForgotPassword },
  { path: '**', redirectTo: '' }
];