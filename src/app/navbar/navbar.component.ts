import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router) {}

  token = '';
  username = '';
  avatar = '';

  ngOnInit(): void {
    this.token = this.cookieService.get('token');
    this.username = this.cookieService.get('username');
    this.avatar = this.cookieService.get('avatar');
  }

  signOut(): void {
    this.cookieService.deleteAll();
    this.router.navigate(['/']);
  }

  // TODO Use new service
  get isSignedIn() {
    return this.cookieService.get('token') === '' ? false : true;
  }
}
