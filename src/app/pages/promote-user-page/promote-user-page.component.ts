import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiInterfaceService } from 'src/app/services/api-interface.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-promote-user-page',
  templateUrl: './promote-user-page.component.html'
})
export class PromoteUserPageComponent implements OnInit {
  user: User;

  isFound = false;
  errorFinding = false;

  badge = '';
  badgeColour = '';

  error = '';

  constructor(
    private apiService: ApiInterfaceService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.user = {
      id: 0,
      username: '',
      emailAddress: '',
      avatar: '',
      badge: '',
      birthday: 0,
      accountCreation: 0,
      isMuted: false,
      isBanned: false,
      isModerator: false,
      isAdmin: false
    };
  }

  ngOnInit(): void {
    let urlUser = this.route.snapshot.paramMap.get('id')!.toString();

    this.apiService.getUser(urlUser).subscribe({
      next: (user: any) => {
        try {
          this.user = user['Table1'][0];
          this.user['avatar'] =
            user['Table1'][0]['avatar'] === ''
              ? 'assets/img/default.png'
              : user['Table1'][0]['avatar'];

          if (this.user.isAdmin === true || this.user.isModerator === true) {
            this.badge =
              this.user.isAdmin === true ? 'Site Admin' : 'Moderator';
            this.badgeColour =
              this.user.isAdmin === true ? 'danger' : 'warning';
          } else {
            this.badge = this.user.badge?.split(':')[0];
            this.badgeColour = this.user.badge?.split(':')[1];
          }

          this.isFound = true;
        } catch (e) {
          this.errorFinding = true;
        }
      },
      error: (e) => {}
    });
  }

  promoteUser(mode: number) {
    this.isFound = false;
    this.apiService
      .promoteUser(
        this.cookieService.get('token'),
        Number(this.cookieService.get('userId')),
        this.user.id,
        mode
      )
      .subscribe({
        next: (user: any) => {
          this.router.navigate(['/u/' + this.user.username]);
        },
        error: (e) => {
          this.isFound = true;
          this.error =
            "You don't have permission to change this user's permissions!";
        }
      });
  }

  get isLoading(): boolean {
    return !this.isFound;
  }
}
