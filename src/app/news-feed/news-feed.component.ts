import { Component, OnInit } from '@angular/core';
import users from '../users.json'
import posts from '../posts.json'

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css'],
})
export class NewsFeedComponent implements OnInit {
  loadingMessage = "";
  isLoading = true;

  data: any; //TODO FIX!!!!!!

  constructor() { }

  ngOnInit(): void {
    posts.forEach(post => {
      users.forEach(currentUser => {
        if (post.posterId === currentUser.id) {
          post.poster = currentUser.username;
          post.shouldShow = currentUser.isMuted === "false" && currentUser.isDeleted === "false" ? "true" : "false";
        }
      });
    });

    this.data = posts.filter((obj) => {
      return obj.shouldShow === "true"
    });

    this.data = this.data.sort((a: { time: number; }, b: { time: number; }) => (a.time > b.time) ? 1 : -1);

    this.loadingMessage = "Now loading";
    this.isLoading = false;
  }

  getRandomInt(min: number, max: number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

}
