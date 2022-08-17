import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiInterfaceService } from 'src/app/services/api-interface.service';
import { StatusCheckerService } from 'src/app/services/status-checker.service';
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

  likeLoading = false;

  mediaId = '';

  // add type
  @Input('id') id!: number;
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
  constructor(
    private timeDifference: TimeDifferenceService,
    private apiService: ApiInterfaceService,
    private cookieService: CookieService,
    private statusService: StatusCheckerService
  ) {}

  ngOnInit(): void {
    typeof this.postDate === 'string'
      ? this.postDate
      : (this.postDate = this.postDate * 1000);
    this.formattedDate = this.timeDifference.calculate(this.postDate);

    if (this.media !== undefined) {
      this.mediaId = this.media!.substring(this.media!.lastIndexOf('/') + 1);
      this.mediaId = 'a' + this.mediaId!.substring(0, 8);
    }

    this.badgeName = this.badge?.split(':')[0];
    this.badgeColour = this.badge?.split(':')[1];
  }

  updateLikes() {
    if (this.isSignedIn) {
      this.likeLoading = true;
      this.apiService
        .updateLikes(
          this.isComment,
          this.cookieService.get('token'),
          this.id,
          this.cookieService.get('userId')
        )
        .subscribe({
          next: (result: any) => {
            this.likes =
              result['message'] === 'Like placed'
                ? Number(this.likes) + 1
                : Number(this.likes) - 1;
            this.likeLoading = false;
          },
          error: (e) => {}
        });
    }
  }

  get hasMedia(): boolean {
    return this.media === '' || this.media === null ? false : true;
  }

  get isImage(): boolean {
    return this.media === ''
      ? false
      : /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(this.media!);
  }

  get isComment(): boolean {
    return this.postType == 'comment' ? true : false;
  }

  get isSignedIn() {
    return this.statusService.isSignedIn;
  }

  get postedByCurrentUser() {
    return this.poster == this.cookieService.get('username');
  }

  get activeUserHasDeletePowers() {
    return this.cookieService.get('role') === 'admin' ? true : false;
  }
}
