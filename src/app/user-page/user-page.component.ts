import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimeDifferenceService } from '../time-difference.service';
import moment from 'moment';
import { ApiInterfaceService } from '../api-interface.service';
import { Post } from '../post';
import { User } from '../user';

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
  isLoading = true;
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
      console.log(this.user);
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
      console.log(posts);
      let iteration = 0;
      Object.keys(posts['Table1']).forEach((key: any) => {
        this.posts[iteration] = {
          id: posts['Table1'][key].id,
          posterId: posts['Table1'][key].posterId,
          poster: posts['Table1'][key].username,
          avatar: posts['Table1'][key].avatar,
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
      this.isLoading = false;
    });

    /*this.apiService.getUserComments(urlUser).subscribe((comments: any) => {
      console.log(comments);
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
          avatar: comments['Table1'][key].avatar
        };
        iteration++;
      });
      this.isLoading = false;
    });

    /*users.forEach((currentUser) => {
      if (urlUser === currentUser.username) {
        this.user = currentUser.username;
        this.avatar = currentUser.avatar;
        this.isDeleted = currentUser.isDeleted === 'true' ? true : false;
        this.isMuted = currentUser.isMuted === 'true' ? true : false;

        if (currentUser.isAdmin === 'true' || currentUser.isModerator === 'true') {
          this.badge = currentUser.isAdmin === 'true' ? 'Site Admin' : 'Moderator';
          this.badgeColour = currentUser.isAdmin === 'true' ? 'danger' : 'warning';
        } else {
          this.badgeColour = currentUser.badge?.split(':')[1];
          this.badge = currentUser.badge?.split(':')[0];
        }

        this.birthday = moment(new Date(currentUser.birthday * 1000)).format('DD MMMM YYYY');
        this.birthdayTimeSince = this.timeDifference.calculate(currentUser.birthday * 1000);
        this.creation = moment(new Date(currentUser.accountCreation * 1000)).format('DD MMMM YYYY');
        this.creationTimeSince = this.timeDifference.calculate(currentUser.accountCreation * 1000);

        this.userFound = true;

        this.data = posts.filter((obj) => {
          return obj.posterId === currentUser.id;
        });

        this.data = this.data.sort((a: { time: number }, b: { time: number }) => (a.time > b.time ? 1 : -1));

        let commentCount = 0;
        comments.forEach((comment) => {
          if (comment.posterId === currentUser.id) {
            this.comments[commentCount] = {
              username: currentUser.username,
              date: comment.date,
              body: comment.body,
              likes: comment.likes
            };

            commentCount = commentCount + 1;
          }
        });
        return;
      }
    });*/
  }
}
