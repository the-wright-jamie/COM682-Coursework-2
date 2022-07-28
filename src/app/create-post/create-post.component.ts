import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  username = 'jamesw-64';
  avatar = 'https://avatars.githubusercontent.com/u/56081223?v=4';
  badge = 'Site Admin:danger';
  type = 'message';
  date = 'now';
  header = '';
  body = '';
  media = '';
  likes = this.getRandomInt(1, 100000);
  comments = this.getRandomInt(1, 100000);

  constructor() {}

  ngOnInit(): void {}

  titleChanged(str: string): void {
    this.header = str;
  }

  bodyChanged(str: string): void {
    this.body = str;
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
