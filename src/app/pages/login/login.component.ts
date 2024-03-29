import { Component, OnInit } from '@angular/core';
import { ApiInterfaceService } from '../../services/api-interface.service';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  signInError = '';
  signingIn = false;

  constructor(
    private apiService: ApiInterfaceService,
    private cookieService: CookieService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.signInError = params['message'];
    });
  }

  attemptLogin(form: NgForm) {
    this.signInError = '';
    this.signingIn = true;

    this.apiService
      .login(form.value['username'], form.value['password'])
      .subscribe({
        next: (result: any) => {
          this.cookieService.set('token', result['token']);
          this.cookieService.set(
            'userId',
            result['userInfo']['Table1'][0]['id']
          );
          this.cookieService.set(
            'avatar',
            result['userInfo']['Table1'][0]['avatar']
          );
          this.cookieService.set(
            'username',
            result['userInfo']['Table1'][0]['username']
          );
          this.cookieService.set(
            'role',
            result['userInfo']['Table1'][0]['isAdmin']
              ? 'admin'
              : result['userInfo']['Table1'][0]['isModerator']
              ? 'moderator'
              : ''
          );

          this.router.navigate(['/feed']);
          this.signingIn = false;
        },
        error: (e) => {
          this.signingIn = false;
          this.signInError = e.error.message;
        }
      });
  }
}
