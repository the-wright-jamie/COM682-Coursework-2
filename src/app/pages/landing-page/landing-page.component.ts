import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StatusCheckerService } from '../../services/status-checker.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private statusService: StatusCheckerService
  ) {}

  ngOnInit(): void {
    if (this.cookieService.get('token') !== '') {
      this.router.navigate(['/feed']);
    }
  }

  get isSignedIn() {
    return this.statusService.isSignedIn;
  }
}
