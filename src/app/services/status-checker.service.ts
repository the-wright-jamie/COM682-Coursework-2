import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StatusCheckerService {
  constructor(private cookieService: CookieService) {}

  get isSignedIn() {
    return this.cookieService.get('token') === '' ? false : true;
  }
}
