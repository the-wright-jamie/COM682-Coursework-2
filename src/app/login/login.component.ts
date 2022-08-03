import { Component, OnInit } from '@angular/core';
import { ApiInterfaceService } from '../api-interface.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInError = '';

  constructor(
    private apiService: ApiInterfaceService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.apiService.login('jamesw-64', '').subscribe({
      next: (result: any) => {
        this.cookieService.set('token', result['token']);
      },
      error: (e) => {
        this.signInError = e.error;
      }
    });
  }
}
