import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  username = '';
  avatar = '';
  badge = '';
  type = 'message';
  date = 'now';
  header = '';
  body = '';
  media = '';
  likes = 0;
  comments = 0;

  constructor(private cookieService: CookieService) {}

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
}
