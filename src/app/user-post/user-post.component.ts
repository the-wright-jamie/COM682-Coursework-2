import { Component, Input, OnInit } from '@angular/core';
import { TimeDifferenceService } from '../time-difference.service';
import users from '../users.json';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {
  formattedDate: string | undefined;
  badgeColour: string | undefined;

  // add type
  @Input() id: number | undefined;
  @Input('poster') poster: string | undefined;
  avatar: string | undefined;
  badge: string | undefined;
  @Input('type') type: string | undefined;
  @Input('date') date!: number | string;
  @Input('header') header: string | undefined;
  @Input('body') body: string | undefined;
  @Input('media') media: string | undefined;
  @Input('likes') likes: number | undefined;
  @Input('comments') comments: number | undefined;
  constructor(private timeDifference: TimeDifferenceService) {}

  ngOnInit(): void {
    typeof this.date === 'string' ? this.date : (this.date = this.date * 1000);
    this.formattedDate = this.timeDifference.calculate(this.date);

    users.forEach((currentUser) => {
      if (currentUser.username === this.poster) {
        this.avatar = currentUser.avatar;
        if (currentUser.isAdmin === 'true' || currentUser.isModerator === 'true') {
          this.badge = currentUser.isAdmin === 'true' ? 'Site Admin' : 'Moderator';
          this.badgeColour = currentUser.isAdmin === 'true' ? 'danger' : 'warning';
        } else {
          this.badgeColour = currentUser.badge?.split(':')[1];
          this.badge = currentUser.badge?.split(':')[0];
        }
        this.avatar = currentUser.avatar;
      }
    });
  }

  get hasMedia(): boolean {
    return this.media == '' ? false : true;
  }

  get isComment(): boolean {
    return this.type == 'comment' ? true : false;
  }
}
