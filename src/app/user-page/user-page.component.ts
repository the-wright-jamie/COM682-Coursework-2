import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimeDifferenceService } from '../time-difference.service';
import moment from 'moment';
import users from '../users.json';
import posts from '../posts.json';
import comments from '../comments.json';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user: string | undefined;
  avatar: string | undefined;
  badge: string | undefined;
  badgeColour: string | undefined;
  birthday: string | undefined;
  birthdayTimeSince: string | undefined;
  creation: string | undefined;
  creationTimeSince: string | undefined;
  userFound = false;
  isDeleted = false;
  isMuted = false;

  data: any; //TODO FIX!!!!!!

  comments = [
    {
      "username": "",
      "date": 0,
      "body": "",
      "likes": 0
    }
  ]

  constructor(private route: ActivatedRoute, private timeDifference: TimeDifferenceService) {
  }

  ngOnInit(): void {
    let urlUser = this.route.snapshot.paramMap.get('id')?.toString();

    users.forEach(currentUser => {
      if (urlUser === currentUser.username) {
        this.user = currentUser.username;
        this.avatar = currentUser.avatar;
        this.isDeleted = currentUser.isDeleted === "true" ? true : false;
        this.isMuted = currentUser.isMuted === "true" ? true : false;

        if (currentUser.isAdmin === "true" || currentUser.isModerator === "true") {
          this.badge = currentUser.isAdmin === "true" ? "Site Admin" : "Moderator"
          this.badgeColour = currentUser.isAdmin === "true" ? "danger" : "warning"
        } else {
          this.badgeColour = currentUser.badge?.split(":")[1];
          this.badge = currentUser.badge?.split(":")[0];
        }

        this.birthday = moment(new Date(currentUser.birthday * 1000)).format("DD MMMM YYYY");
        this.birthdayTimeSince = this.timeDifference.calculate(currentUser.birthday * 1000);
        this.creation = moment(new Date(currentUser.accountCreation * 1000)).format("DD MMMM YYYY");
        this.creationTimeSince = this.timeDifference.calculate(currentUser.accountCreation * 1000);

        this.userFound = true;

        this.data = posts.filter((obj) => {
          return obj.posterId === currentUser.id;
        });

        this.data = this.data.sort((a: { time: number; }, b: { time: number; }) => (a.time > b.time) ? 1 : -1);

        let commentCount = 0;
        comments.forEach(comment => {
          if (comment.posterId === currentUser.id) {
            this.comments[commentCount] = {
              username: currentUser.username,
              date: comment.date,
              body: comment.body,
              likes: comment.likes,
            }

            commentCount = commentCount + 1;
          }
        });
        return;
      }
    });
  }

}
