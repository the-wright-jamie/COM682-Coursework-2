import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StatusCheckerService } from 'src/app/services/status-checker.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private statusService: StatusCheckerService
  ) {}

  token = '';
  username = '';
  avatar = '';

  ngOnInit(): void {
    this.token = this.cookieService.get('token');
    this.username = this.cookieService.get('username');
    this.avatar = this.cookieService.get('avatar');
  }

  signOut(): void {
    this.cookieService.deleteAll('/');
    this.router.navigate(['/']);
  }

  get isSignedIn() {
    return this.statusService.isSignedIn;
  }
}
