import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './login/login';
import { config } from './login/login.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(App, config, context);

export default bootstrap;
