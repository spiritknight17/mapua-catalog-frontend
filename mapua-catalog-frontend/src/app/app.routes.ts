import { Routes } from '@angular/router';
import { LoginPage } from './features/login-page/login/login-page';
import { McBoard } from './features/mc-board/mc-board';
import { ForgotPassword } from './features/login-page/forgot-password/forgot-password';
import { PasswordRecovery } from './features/login-page/password-recovery/password-recovery';
import { ResetPassword } from './features/login-page/reset-password/reset-password';
import { PasswordResetSuccessful } from './features/login-page/password-reset-successful/password-reset-successful';
import { HeaderComponent } from './core/header/header.component';

export const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'kanban-board', component: McBoard },
  { path: 'header', component: HeaderComponent },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'password-recovery', component: PasswordRecovery },
  { path: 'reset-password', component: ResetPassword},
  { path: 'password-reset-successful', component: PasswordResetSuccessful},
  { path: '**', redirectTo: '' }
];