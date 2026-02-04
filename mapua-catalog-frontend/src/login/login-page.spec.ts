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
  let component: LoginPage;
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
    component = fixture.componentInstance;
    fixture.detectChanges();
    router.initialNavigation();
    await fixture.whenStable();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  })
});