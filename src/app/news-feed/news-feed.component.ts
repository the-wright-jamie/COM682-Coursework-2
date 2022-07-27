import { Component, OnInit } from '@angular/core';
import { ApiInterfaceService } from '../api-interface.service'
import users from '../users.json'
import posts from '../posts.json'
import comments from '../comments.json';

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
      let commentCount = 0;
      comments.forEach(comment => {
        if (comment.postId === post.id) {
          commentCount = commentCount + 1;
        }
      });

      post.comments = commentCount;

      ApiInterfaceService.getUsers().forEach(currentUser => {
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
