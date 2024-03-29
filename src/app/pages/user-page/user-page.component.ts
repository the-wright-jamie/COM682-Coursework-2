import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimeDifferenceService } from '../../services/time-difference.service';
import moment from 'moment';
import { ApiInterfaceService } from '../../services/api-interface.service';
import { Post } from '../../types/post';
import { User } from '../../types/user';
import { Comment } from '../../types/comment';
import { CookieService } from 'ngx-cookie-service';
import { StatusCheckerService } from '../../services/status-checker.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html'
})
export class UserPageComponent implements OnInit {
  data: any; //TODO FIX!!!!!!

  posts: Post[];
  user: User;
  comments: Comment[];
  postsLoaded = false;
  hasPosts = false;
  commentsLoaded = false;
  hasComments = false;
  userFound = false;

  birthdayString = '';
  birthdayTimeSince = '';
  accountCreationString = '';
  accountCreationTimeSince = '';

  badge = '';
  badgeColour = '';

  followStatus = 'Follow';
  followerCount = 0;
  followingCount = 0;

  constructor(
    private route: ActivatedRoute,
    private timeDifference: TimeDifferenceService,
    private apiService: ApiInterfaceService,
    private cookieService: CookieService,
    private statusService: StatusCheckerService
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
    this.posts = [];
    this.comments = [];
  }

  ngOnInit(): void {
    let urlUser = this.route.snapshot.paramMap.get('id')!.toString();

    this.apiService.getUser(urlUser).subscribe((user: any) => {
      this.user = user['Table1'][0];
      this.user['avatar'] =
        user['Table1'][0]['avatar'] === ''
          ? 'assets/img/default.png'
          : user['Table1'][0]['avatar'];
      this.userFound = true;

      if (this.user.isAdmin === true || this.user.isModerator === true) {
        this.badge = this.user.isAdmin === true ? 'Site Admin' : 'Moderator';
        this.badgeColour = this.user.isAdmin === true ? 'danger' : 'warning';
      } else {
        this.badge = this.user.badge?.split(':')[0];
        this.badgeColour = this.user.badge?.split(':')[1];
      }

      this.birthdayString = moment(new Date(this.user.birthday * 1000)).format(
        'DD MMMM YYYY'
      );
      this.birthdayTimeSince = this.timeDifference.calculate(
        this.user.birthday * 1000
      );
      this.accountCreationString = moment(
        new Date(this.user.accountCreation * 1000)
      ).format('DD MMMM YYYY');
      this.accountCreationTimeSince = this.timeDifference.calculate(
        this.user.accountCreation * 1000
      );

      this.apiService
        .getFollowingForUser(Number(this.cookieService.get('userId')))
        .subscribe((following: any) => {
          Object.keys(following['Table1']).forEach((key: any) => {
            if (following['Table1'][key].followingId == this.user.id) {
              this.followStatus = 'Following';
            }
          });
        });

      this.apiService
        .getFollowingAndFollowerCountForUser(this.user.id)
        .subscribe((counts: any) => {
          this.followingCount = counts['Table1'][0]['following'];
          this.followerCount = counts['Table1'][0]['followers'];
        });
    });

    this.apiService.getPostsByUser(urlUser).subscribe((posts: any) => {
      try {
        let iteration = 0;
        Object.keys(posts['Table1']).forEach((key: any) => {
          this.posts[iteration] = {
            id: posts['Table1'][key].id,
            posterId: posts['Table1'][key].posterId,
            poster: posts['Table1'][key].username,
            avatar: posts['Table1'][key].avatar,
            badge:
              posts['Table1'][key].isAdmin == true
                ? 'Site Admin:danger'
                : posts['Table1'][key].isModerator == true
                ? 'Moderator:warning'
                : posts['Table1'][key].badge,
            postType: posts['Table1'][key].postType,
            postDate: posts['Table1'][key].postDate,
            header: posts['Table1'][key].header,
            body: posts['Table1'][key].body,
            media: posts['Table1'][key].media,
            comments: posts['Table1'][key].comments,
            likes: posts['Table1'][key].likes
          };
          iteration++;
          this.hasPosts = true;
        });
      } catch (e) {
        this.hasPosts = false;
      }
      this.postsLoaded = true;
    });

    this.apiService.getUserComments(urlUser).subscribe((comments: any) => {
      try {
        let iteration = 0;
        Object.keys(comments['Table1']).forEach((key: any) => {
          this.comments[iteration] = {
            id: comments['Table1'][key].id,
            postId: comments['Table1'][key].postId,
            posterId: comments['Table1'][key].posterId,
            postDate: comments['Table1'][key].postDate,
            body: comments['Table1'][key].body,
            likes: comments['Table1'][key].likes,
            username: comments['Table1'][key].username,
            avatar: comments['Table1'][key].avatar,
            badge:
              comments['Table1'][key].isAdmin == true
                ? 'Site Admin:danger'
                : comments['Table1'][key].isModerator == true
                ? 'Moderator:warning'
                : comments['Table1'][key].badge
          };
          iteration++;
          this.hasComments = true;
        });
      } catch (e) {
        this.hasComments = false;
      }
      this.commentsLoaded = true;
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  get isLoading(): boolean {
    return !(this.postsLoaded && this.commentsLoaded);
  }

  get userIsOnTheirPage(): boolean {
    return this.route.snapshot.paramMap.get('id')!.toString() ===
      this.cookieService.get('username')
      ? true
      : false;
  }

  get isSignedIn(): boolean {
    return this.statusService.isSignedIn;
  }

  get userIsAdmin(): boolean {
    return this.cookieService.get('role') === 'admin';
  }

  setFollowingStatus(): void {
    switch (this.followStatus === 'Follow') {
      case true:
        this.followStatus = '...';
        this.apiService
          .followUser(
            Number(this.cookieService.get('userId')),
            this.user.id,
            this.cookieService.get('token')
          )
          .subscribe({
            next: () => {
              this.followStatus = 'Following';
            },
            error: (e: any) => {
              this.followStatus = 'Error updating the follow status';
            }
          });
        break;
      case false:
        this.followStatus = '...';
        this.apiService
          .unfollowUser(
            Number(this.cookieService.get('userId')),
            this.user.id,
            this.cookieService.get('token')
          )
          .subscribe({
            next: () => {
              this.followStatus = 'Follow';
            },
            error: (e: any) => {
              this.followStatus = 'Error updating the follow status';
            }
          });
        break;
    }
  }
}
