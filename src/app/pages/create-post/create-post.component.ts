import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiInterfaceService } from 'src/app/services/api-interface.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html'
})
export class CreatePostComponent implements OnInit {
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

  isPosting = false;

  constructor(
    private cookieService: CookieService,
    private apiService: ApiInterfaceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.cookieService.get('username');
    this.avatar = this.cookieService.get('avatar');
  }

  post(): void {
    this.isPosting = true;
    this.apiService
      .createPost(
        this.cookieService.get('token'),
        Number(this.cookieService.get('userId')),
        this.header.replace("'", "''"),
        this.body.replace("'", "''"),
        this.media
      )
      .subscribe({
        next: (response: any) => {
          let ids = response['Table1'].reverse();
          this.router.navigate(['/post/' + ids[0]['id']]);
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
