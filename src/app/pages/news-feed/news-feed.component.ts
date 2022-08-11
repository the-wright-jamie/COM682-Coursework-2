import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiInterfaceService } from '../../services/api-interface.service';
import { Post } from '../../types/post';
import { StatusCheckerService } from '../../services/status-checker.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewsFeedComponent implements OnInit {
  loadingMessage = '';
  notFollowingAnyone = false;
  isLoading = true;
  posts: Post[];

  data: any; //TODO FIX!!!!!!

  page = 1;

  constructor(
    private apiService: ApiInterfaceService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private statusService: StatusCheckerService
  ) {
    this.posts = [];
    this.data = [];
  }

  ngOnInit(): void {
    this.page = Number(this.route.snapshot.paramMap.get('page')?.toString());

    if (this.isSignedIn) {
      this.apiService
        .getPosts(Number(this.cookieService.get('userId')), this.page)
        .subscribe((posts: any) => {
          try {
            let iteration = 0;
            Object.keys(posts['Table1']).forEach((key: any) => {
              this.posts[iteration] = {
                id: posts['Table1'][key].id,
                posterId: posts['Table1'][key].posterId,
                poster: posts['Table1'][key].username,
                avatar: posts['Table1'][key].avatar,
                badge:
                  posts['Table1'][key].isAdmin == true
                    ? 'Site Admin:danger'
                    : posts['Table1'][key].isModerator == true
                    ? 'Moderator:warning'
                    : posts['Table1'][key].badge,
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
