import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './login/login.config';
import { App } from './login/login';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
