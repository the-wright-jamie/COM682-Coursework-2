import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimeDifferenceService } from '../time-difference.service';
import moment from 'moment';
import { Users } from '../users';
import users from './../users.json';

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

  constructor(private route: ActivatedRoute, private timeDifference: TimeDifferenceService) {
  }

  ngOnInit(): void {
    let urlUser = this.route.snapshot.paramMap.get('id')?.toString();
    console.log(users);

    users.forEach(currentUser => {
      if(urlUser === currentUser.username) {
        this.user = currentUser.username;
        this.avatar = currentUser.avatar;

        this.badgeColour = currentUser.badge?.split(":")[1];
        this.badge = currentUser.badge?.split(":")[0];

        this.birthday = moment(new Date(currentUser.birthday * 1000)).format("DD MMMM   YYYY");
        this.birthdayTimeSince = this.timeDifference.calculate(currentUser.birthday * 1000);
        this.creation = moment(new Date(currentUser.accountCreation * 1000)).format("DD MMMM   YYYY");
        this.creationTimeSince = this.timeDifference.calculate(currentUser.accountCreation * 1000);

        this.userFound = true;

        return;
      }
    });
  }

}
