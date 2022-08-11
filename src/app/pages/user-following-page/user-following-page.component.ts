import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiInterfaceService } from 'src/app/services/api-interface.service';

@Component({
  selector: 'app-user-following-page',
  templateUrl: './user-following-page.component.html'
})
export class UserFollowingPageComponent implements OnInit {
  followings: any[];
  isLoading = true;
  hasMembers = false;

  username = '';
  avatar = '';
  badge = '';
  badgeColour = '';

  constructor(
    private apiService: ApiInterfaceService,
    private route: ActivatedRoute
  ) {
    this.followings = [];
  }

  ngOnInit(): void {
    let urlUser = this.route.snapshot.paramMap.get('id')!.toString();

    this.apiService.getUser(urlUser).subscribe((user: any) => {
      let userId = user['Table1'][0]['id'];
      this.username = user['Table1'][0]['username'];
      this.avatar =
        user['Table1'][0]['avatar'] === ''
          ? 'assets/img/default.png'
          : user['Table1'][0]['avatar'];
      let isAdmin = user['Table1'][0]['isAdmin'];
      let isModerator = user['Table1'][0]['isModerator'];

      if (isAdmin === true || isModerator === true) {
        this.badge = isAdmin === true ? 'Site Admin' : 'Moderator';
        this.badgeColour = isAdmin === true ? 'danger' : 'warning';
      } else {
        this.badge = user['Table1'][0]['badge']?.split(':')[0];
        this.badgeColour = user['Table1'][0]['badge']?.split(':')[1];
      }

      this.apiService
        .getFollowingForUser(userId)
        .subscribe((followings: any) => {
          try {
            let iteration = 0;
            followings['Table1'].forEach((follower: any) => {
              this.followings[iteration] = follower['followedUsername'];
              iteration++;
            });
            this.hasMembers = true;
          } catch (e) {
            this.hasMembers = false;
          }
          this.isLoading = false;
        });
    });
  }
}
