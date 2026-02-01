import { Routes } from '@angular/router';
import { LoginPage } from './login-page';
import { McBoard } from '../mc-board/mc-board';
import { ForgotPassword } from '../forgot-password/forgot-password';
import { PasswordRecovery } from '../password-recovery/password-recovery';
import { ResetPassword } from '../reset-password/reset-password';
import { PasswordResetSuccessful } from '../password-reset-successful/password-reset-successful';

export const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'mc-board', component: McBoard },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'password-recovery', component: PasswordRecovery },
  { path: 'reset-password', component: ResetPassword},
  { path: 'password-reset-successful', component: PasswordResetSuccessful},
  { path: '**', redirectTo: '' }
];