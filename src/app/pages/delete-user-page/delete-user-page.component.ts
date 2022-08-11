import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiInterfaceService } from 'src/app/services/api-interface.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-delete-user-page',
  templateUrl: './delete-user-page.component.html'
})
export class DeleteUserPageComponent implements OnInit {
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

  delete() {
    this.isFound = false;
    this.apiService
      .deleteUser(
        this.cookieService.get('token'),
        Number(this.cookieService.get('userId')),
        this.user.id
      )
      .subscribe({
        next: (user: any) => {
          if (this.cookieService.get('role') == 'admin') {
            this.router.navigate(['/']);
          } else {
            this.cookieService.deleteAll('/');
            this.router.navigate(['/']);
          }
        },
        error: (e) => {
          this.isFound = true;
          this.error = "You don't have permission to delete this user!";
        }
      });
  }

  get isLoading(): boolean {
    return !this.isFound;
  }
}
