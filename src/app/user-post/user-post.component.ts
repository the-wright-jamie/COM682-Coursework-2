import { Component, Input, OnInit } from '@angular/core';
import { TimeDifferenceService } from '../time-difference.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {

  formattedDate: string | undefined;
  badgeColour: string | undefined;

  // add type
  @Input('username') username: string | undefined;
  @Input('avatar') avatar: string | undefined;
  @Input('badge') badge: string | undefined;
  @Input('type') type: string | undefined;
  @Input('date') date!: number | string;
  @Input('header') header: string | undefined;
  @Input('body') body: string | undefined;
  @Input('media') media: string | undefined;
  @Input('likes') likes: number | undefined;
  @Input('comments') comments: number | undefined;
  constructor(private timeDifference: TimeDifferenceService) { }

  ngOnInit(): void {
    typeof this.date === 'string' ? this.date : this.date = this.date * 1000;
    this.formattedDate = this.timeDifference.calculate(this.date);

    this.badgeColour = this.badge?.split(":")[1];
    this.badge = this.badge?.split(":")[0];
  }

  get hasMedia(): boolean {
    return this.media == "" ? false : true;
  }
}
