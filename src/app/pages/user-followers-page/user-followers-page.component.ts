import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiInterfaceService } from 'src/app/services/api-interface.service';

@Component({
  selector: 'app-user-followers-page',
  templateUrl: './user-followers-page.component.html'
})
export class UserFollowersPageComponent implements OnInit {
  followers: any[];
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
    this.followers = [];
  }

  ngOnInit(): void {
    let urlUser = this.route.snapshot.paramMap.get('id')!.toString();

    this.apiService.getUser(urlUser).subscribe((user: any) => {
      let userId = user['Table1'][0]['id'];
      this.username = user['Table1'][0]['username'];
      this.avatar = user['Table1'][0]['avatar'];
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
        .getFollowersForUser(userId)
        .subscribe((followers: any) => {
          try {
            let iteration = 0;
            followers['Table1'].forEach((follower: any) => {
              this.followers[iteration] = follower['followerUsername'];
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
