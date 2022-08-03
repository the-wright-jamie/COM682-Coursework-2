import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiInterfaceService } from '../api-interface.service';
import { Post } from '../post';
import { StatusCheckerService } from '../status-checker.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewsFeedComponent implements OnInit {
  loadingMessage = '';
  notFollowingAnyone = false;
  isLoading = true;
  posts: Post[];

  data: any; //TODO FIX!!!!!!

  constructor(
    private apiService: ApiInterfaceService,
    private cookieService: CookieService,
    private router: Router,
    private statusService: StatusCheckerService
  ) {
    this.posts = [];
    this.data = [];
  }

  ngOnInit(): void {
    if (this.isSignedIn) {
      this.apiService
        .getPosts(Number(this.cookieService.get('userId')))
        .subscribe((posts: any) => {
          try {
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
          } catch (e) {
            this.notFollowingAnyone = true;
          }

          this.isLoading = false;
        });
    } else {
      this.router.navigate(['/']);
    }
  }

  get isSignedIn() {
    return this.statusService.isSignedIn;
  }
}
