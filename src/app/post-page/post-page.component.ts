import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { TimeDifferenceService } from '../time-difference.service';

import users from '../users.json';
import posts from '../posts.json';
import comments from '../comments.json';


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  post = {
    "id": 0,
    "username": "",
    "avatar": "",
    "badge": "",
    "type": "",
    "date": 0,
    "header": "",
    "body": "",
    "media": "",
    "likes": 0,
    "comments": 0
  }

  comments = [
    {
      "username": "",
      "date": 0,
      "body": "",
      "likes": 0
    }
  ]

  isFound = false;

  constructor(private route: ActivatedRoute, private timeDifference: TimeDifferenceService) {
  }

  ngOnInit(): void {
    posts.forEach(post => {
      if (post.id === Number(this.route.snapshot.paramMap.get('id')?.toString())) {
        this.isFound = true;
        
        this.post.id = post.id;

        users.forEach(currentUser => {
          if (post.posterId === currentUser.id) {
            this.post.username = currentUser.username;
            this.post.avatar = currentUser.avatar;
            this.post.badge = currentUser.badge;
            // post.shouldShow = currentUser.isMuted === "false" && currentUser.isDeleted === "false" ? "true" : "false";
          }
        });

        this.post.type = post.type;
        this.post.date = post.date;
        this.post.header = post.header;
        this.post.body = post.body;
        this.post.media = post.media;
        this.post.likes = post.likes;

        let commentCount = 0;
        comments.forEach(comment => {
          if (comment.postId === post.id) {
            users.forEach(currentUser => {
              if (comment.posterId === currentUser.id) {
                this.comments[commentCount] = {
                  username: currentUser.username,
                  date: comment.date,
                  body: comment.body,
                  likes: comment.likes,
                }
              }
            });

            commentCount = commentCount + 1;
          }
        });

        this.post.comments = commentCount;
      }
    });
  }
}
