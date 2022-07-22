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
      avatar: "https://avatars.githubusercontent.com/u/56081223?v=4",
      badge: "Site Admin:danger",
      type: "message",
      date: 1658515830,
      header: "This is the first post ever",
      body: "This is a post to celebrate the first ever post on the website. Here's what I have to say: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vestibulum nisi nisi, ut scelerisque nunc lacinia sit amet.",
      media: "",
      likes: this.getRandomInt(1, 100000),
      comments: this.getRandomInt(1, 100000)
    },
    {
      id: 2,
      username: "johndoe",
      avatar: "https://exploringbits.com/wp-content/uploads/2022/01/minecraft-pfp-4.jpg?ezimgfmt=rs:352x374/rscb3/ng:webp/ngcb3",
      badge: "Early Adopter:primary",
      type: "message",
      date: 1658518630,
      header: "The second post!",
      body: "This is a post about something. Here's what I have to say: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vestibulum nisi nisi, ut scelerisque nunc lacinia sit amet.",
      media: "",
      likes: this.getRandomInt(1, 100000),
      comments: this.getRandomInt(1, 100000)
    },
    {
      id: 3,
      username: "janedoe",
      avatar: "https://external-preview.redd.it/mmib6McnGvZ-u9bFr73wlV8Nc3dVWf73xq9HHeOJe_U.png?format=pjpg&auto=webp&s=7db39b70e6f4a5d41a71a42853c87a931465e2fc",
      badge: "",
      type: "image",
      date: 1658521630,
      header: "I'm sad!",
      body: "I joined just a few hours too late and didn't get the early adopter badge. Guys, this is honestly really toxic and I think I should be allowed to have the badge. Let's boycott and cancel UlsterBook!",
      media: "https://ichef.bbci.co.uk/news/976/cpsprodpb/2D45/production/_114898511_hi062045152.jpg",
      likes: this.getRandomInt(1, 100000),
      comments: this.getRandomInt(1, 100000)
    }
  ]

  constructor() { }

  ngOnInit(): void {
    this.loadingMessage = "Now loading";
    this.isLoading = false;
  }

  getRandomInt(min: number, max: number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

}
