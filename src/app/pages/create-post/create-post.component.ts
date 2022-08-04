import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiInterfaceService } from 'src/app/services/api-interface.service';

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

  constructor(
    private cookieService: CookieService,
    private apiService: ApiInterfaceService
  ) {}

  ngOnInit(): void {
    this.username = this.cookieService.get('username');
    this.avatar = this.cookieService.get('avatar');
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
}
