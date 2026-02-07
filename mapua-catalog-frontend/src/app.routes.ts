import { Routes } from '@angular/router';
import { LoginPage } from './app/features/login-page/login/login-page';
import { McBoard } from './app/features/mc-board/mc-board';
import { ForgotPassword } from './app/features/login-page/forgot-password/forgot-password';
import { PasswordRecovery } from './app/features/login-page/password-recovery/password-recovery';
import { ResetPassword } from './app/features/login-page/reset-password/reset-password';
import { PasswordResetSuccessful } from './app/features/login-page/password-reset-successful/password-reset-successful';
import { HeaderComponent } from './app/core/header/header.component';

export const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'mc-board', component: McBoard },
  { path: 'header', component: HeaderComponent },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'password-recovery', component: PasswordRecovery },
  { path: 'reset-password', component: ResetPassword },
  { path: 'password-reset-successful', component: PasswordResetSuccessful },
  { path: '**', redirectTo: '' },
];
