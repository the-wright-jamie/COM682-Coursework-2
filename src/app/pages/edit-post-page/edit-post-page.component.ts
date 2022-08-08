import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiInterfaceService } from 'src/app/services/api-interface.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-post-page',
  templateUrl: './edit-post-page.component.html'
})
export class EditPostPageComponent implements OnInit {
  username = '';
  avatar = '';
  badge = '';
  type = 'post';
  date = 'just now';
  header = '';
  body = '';
  media = '';
  likes = 0;
  comments = 0;

  postId = 0;

  isPosting = false;

  isLoading = true;
  notFound = false;

  constructor(
    private cookieService: CookieService,
    private apiService: ApiInterfaceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id')?.toString());

    this.apiService.getPost(this.postId).subscribe((post: any) => {
      this.username = this.cookieService.get('username');
      this.avatar = this.cookieService.get('avatar');

      try {
        this.avatar = post['Table1'][0].avatar;
        this.badge =
          post['Table1'][0].isAdmin == true
            ? 'Site Admin:danger'
            : post['Table1'][0].isModerator == true
            ? 'Moderator:warning'
            : post['Table1'][0].badge;
        this.date = post['Table1'][0].postDate;
        this.header = post['Table1'][0].header;
        this.body = post['Table1'][0].body;
        this.media = post['Table1'][0].media;
        this.likes = post['Table1'][0].likes;
        this.comments = post['Table1'][0].comments;

        this.isLoading = false;
      } catch (e) {
        this.notFound = true;
        this.isLoading = false;
      }
    });
  }

  update(): void {
    this.isPosting = true;
    this.apiService
      .editPost(
        this.cookieService.get('token'),
        Number(this.cookieService.get('userId')),
        this.header.replace(/'/g, "''"),
        this.body.replace(/'/g, "''"),
        this.media,
        this.postId
      )
      .subscribe({
        next: (response: any) => {
          this.router.navigate(['/post/' + this.postId]);
        },
        error: (e) => {}
      });
  }

  titleChanged(str: string): void {
    this.header = str;
  }

  bodyChanged(str: string): void {
    this.body = str;
  }

  mediaChanged(str: string): void {
    this.media = str;
  }

  get readyToPost(): boolean {
    return this.header !== '' && this.body !== '';
  }

  get dataOverload(): boolean {
    return this.header.length > 128 || this.body.length > 2000;
  }
}
