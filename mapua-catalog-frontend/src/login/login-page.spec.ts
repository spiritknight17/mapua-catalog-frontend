import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { LoginPage } from './login-page';
import { McBoard } from '../mc-board/mc-board';
import { ForgotPassword } from '../forgot-password/forgot-password';
import { AuthService } from './auth.service';

describe('LoginPage navigation and auth', () => {
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        LoginPage,
        RouterTestingModule.withRoutes([
          { path: '', component: LoginPage },
          { path: 'mc-board', component: McBoard },
          { path: 'forgot-password', component: ForgotPassword },
        ]),
      ],
      providers: [{ provide: AuthService}],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(LoginPage);
    router.initialNavigation();
    await fixture.whenStable();
  });

  function setFormValues(email: string, password: string) {
    const compiled = fixture.nativeElement as HTMLElement;
    (compiled.querySelector('#Email') as HTMLInputElement).value = email;
    (compiled.querySelector('#Password') as HTMLInputElement).value = password;
  }

  it('redirects to /mc-board on valid login', fakeAsync(() => {
    
    setFormValues('user@example.com', 'password123');
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    tick();
    expect(router.url).toBe('/mc-board');
  }));

  it('shows error and does not redirect on invalid login', fakeAsync(() => {
   
    setFormValues('bad@example.com', 'nope');
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    tick();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-message')?.textContent).toContain('Invalid');
    expect(router.url).toBe('/');
  }));

  it('navigates to /forgot-password on link click', fakeAsync(() => {
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    link.click();
    tick();
    expect(location.path()).toBe('/forgot-password');
  }));
});