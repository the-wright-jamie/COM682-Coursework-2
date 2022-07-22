import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {

  formattedDate: Date | undefined;

  // add type
  @Input('username') username: string | undefined;
  @Input('type') type: string | undefined;
  @Input('date') date!: number;
  @Input('header') header: string | undefined;
  @Input('body') body: string | undefined;
  @Input('likes') likes: number | undefined;
  @Input('comments') comments: number | undefined;
  constructor() { }

  ngOnInit(): void {
    let d = new Date();
    this.formattedDate = new Date((this.date*1000));
    console.log(this.username);
    console.log(this.type);
    console.log(this.date);
    console.log(this.header);
    console.log(this.body);
    console.log(this.likes);
    console.log(this.comments);
  }

}
