import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css'],
})
export class NewsFeedComponent implements OnInit {
  loadingMessage = "";
  isLoading = true;

  data = [
    {
      id: 1,
      username: "jamesw-64",
      type: "message",
      date: 1658515830,
      header: "This is the first post ever",
      body: "This is a post to celebrate the first ever post on the website. Here's what I have to say: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vestibulum nisi nisi, ut scelerisque nunc lacinia sit amet.",
      likes: 15245,
      comments: 54323
    },
    {
      id: 2,
      username: "johndoe",
      type: "message",
      date: 1658518630,
      header: "The second post!",
      body: "This is a post about something. Here's what I have to say: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vestibulum nisi nisi, ut scelerisque nunc lacinia sit amet.",
      likes: 15245,
      comments: 54323
    }
  ]

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);

    this.loadingMessage = "Now loading";

    this.isLoading = false;
  }

}
