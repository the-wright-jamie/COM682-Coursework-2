import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimeDifferenceService } from '../time-difference.service';
import moment from 'moment';
import { ApiInterfaceService } from '../api-interface.service';
import { Post } from '../post';
import { User } from '../user';
import { Comment } from '../comment';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  data: any; //TODO FIX!!!!!!

  posts: Post[];
  user: User;
  comments: Comment[];
  postsLoaded = false;
  commentsLoaded = false;
  userFound = false;

  birthdayString = '';
  birthdayTimeSince = '';
  accountCreationString = '';
  accountCreationTimeSince = '';

  badge = '';
  badgeColour = '';

  constructor(
    private route: ActivatedRoute,
    private timeDifference: TimeDifferenceService,
    private apiService: ApiInterfaceService
  ) {
    this.user = {
      id: 0,
      username: '',
      emailAddress: '',
      avatar: '',
      badge: '',
      birthday: 0,
      accountCreation: 0,
      isDeleted: false,
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
      this.userFound = true;

      if (this.user.isAdmin === true || this.user.isModerator === true) {
        this.badge = this.user.isAdmin === true ? 'Site Admin' : 'Moderator';
        this.badgeColour = this.user.isAdmin === true ? 'danger' : 'warning';
      } else {
        this.badge = this.user.badge?.split(':')[0];
        this.badgeColour = this.user.badge?.split(':')[1];
      }

      this.birthdayString = moment(new Date(this.user.birthday * 1000)).format('DD MMMM YYYY');
      this.birthdayTimeSince = this.timeDifference.calculate(this.user.birthday * 1000);
      this.accountCreationString = moment(new Date(this.user.accountCreation * 1000)).format('DD MMMM YYYY');
      this.accountCreationTimeSince = this.timeDifference.calculate(this.user.accountCreation * 1000);
    });

    this.apiService.getPostsByUser(urlUser).subscribe((posts: any) => {
      let iteration = 0;
      Object.keys(posts['Table1']).forEach((key: any) => {
        this.posts[iteration] = {
          id: posts['Table1'][key].id,
          posterId: posts['Table1'][key].posterId,
          poster: posts['Table1'][key].username,
          avatar: posts['Table1'][key].avatar,
          badge: posts['Table1'][key].badge,
          postType: posts['Table1'][key].postType,
          postDate: posts['Table1'][key].postDate,
          header: posts['Table1'][key].header,
          body: posts['Table1'][key].body,
          media: posts['Table1'][key].media,
          comments: posts['Table1'][key].comments,
          likes: posts['Table1'][key].likes
        };
        iteration++;
      });
      this.postsLoaded = true;
    });

    this.apiService.getUserComments(urlUser).subscribe((comments: any) => {
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
          badge: comments['Table1'][key].badge
        };
        iteration++;
      });
      this.commentsLoaded = true;
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  get isLoading(): boolean {
    return !(this.postsLoaded && this.commentsLoaded);
  }
}
