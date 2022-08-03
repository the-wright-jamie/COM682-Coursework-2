import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { TimeDifferenceService } from '../../services/time-difference.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserPostComponent implements OnInit {
  formattedDate: string | undefined;
  badgeColour: string | undefined;
  badgeName: string | undefined;

  // add type
  @Input('id') id: number | undefined;
  @Input('underPostId') underPostId: number | undefined;
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
    typeof this.postDate === 'string'
      ? this.postDate
      : (this.postDate = this.postDate * 1000);
    this.formattedDate = this.timeDifference.calculate(this.postDate);

    this.badgeName = this.badge?.split(':')[0];
    this.badgeColour = this.badge?.split(':')[1];
  }

  get hasMedia(): boolean {
    return this.media === '' || this.media === null ? false : true;
  }

  get isComment(): boolean {
    return this.postType == 'comment' ? true : false;
  }
}
