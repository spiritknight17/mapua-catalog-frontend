import { Routes } from '@angular/router';

import { LoginPage } from './features/login-page/login/login-page';
import { McBoard } from './features/mc-board/mc-board';
import { AnalyticsPageComponent } from './features/analytics/analytics-page.component';

import { ForgotPassword } from './features/login-page/forgot-password/forgot-password';
import { PasswordRecovery } from './features/login-page/password-recovery/password-recovery';
import { ResetPassword } from './features/login-page/reset-password/reset-password';
import { PasswordResetSuccessful } from './features/login-page/password-reset-successful/password-reset-successful';
import { CalendarPage } from './features/calendar-page/calendar-page';

export const routes: Routes = [
  // Auth
  { path: '', component: LoginPage },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'password-recovery', component: PasswordRecovery },
  { path: 'reset-password', component: ResetPassword },
  { path: 'password-reset-successful', component: PasswordResetSuccessful },

  // Main app
  { path: 'mc-board', component: McBoard },
  { path: 'calendar', component: CalendarPage },
];
