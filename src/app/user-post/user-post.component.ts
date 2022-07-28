import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TimeDifferenceService } from '../time-difference.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserPostComponent implements OnInit {
  formattedDate: string | undefined;
  badgeColour: string | undefined;

  // add type
  @Input('id') id: number | undefined;
  @Input('poster') poster: string | undefined;
  @Input('avatar') avatar: string | undefined;
  @Input('badge') badge: string | undefined;
  @Input('postType') postType: string | undefined;
  @Input('postDate') postDate!: number | string;
  @Input('header') header: string | undefined;
  @Input('body') body: string | undefined;
  @Input('media') media: string | undefined;
  @Input('likes') likes: number | undefined;
  @Input('comments') comments: number | undefined;
  constructor(private timeDifference: TimeDifferenceService) {}

  ngOnInit(): void {
    typeof this.postDate === 'string' ? this.postDate : (this.postDate = this.postDate * 1000);
    this.formattedDate = this.timeDifference.calculate(this.postDate);

    /*this.users.forEach((currentUser) => {
      if (currentUser.username === this.poster) {
        this.avatar = currentUser.avatar.valueOf();
        if (currentUser.isAdmin === true || currentUser.isModerator === true) {
          this.badge = currentUser.isAdmin === true ? 'Site Admin' : 'Moderator';
          this.badgeColour = currentUser.isAdmin === true ? 'danger' : 'warning';
        } else {
          this.badgeColour = currentUser.badge?.split(':')[1];
          this.badge = currentUser.badge?.split(':')[0];
        }
      }
    });*/
  }

  get hasMedia(): boolean {
    return this.media == '' ? false : true;
  }

  get isComment(): boolean {
    return this.postType == 'comment' ? true : false;
  }
}
