import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { ApiInterfaceService } from '../api-interface.service';
import { Post } from '../post';
import { Comment } from '../comment';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  post: Post;
  comments: Comment[];

  isFound = false;
  postLoaded = false;
  commentsLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiInterfaceService
  ) {
    this.comments = [];
    this.post = {
      id: 0,
      posterId: 0,
      poster: '',
      avatar: '',
      badge: '',
      postType: '',
      postDate: 0,
      header: '',
      body: '',
      media: '',
      comments: 0,
      likes: 0
    };
  }

  ngOnInit(): void {
    let postId = Number(this.route.snapshot.paramMap.get('id')?.toString());
    this.apiService.getPost(postId).subscribe((post: any) => {
      this.isFound = true;

      this.post.id = post['Table1'][0].id;
      this.post.poster = post['Table1'][0].username;
      this.post.avatar = post['Table1'][0].avatar;
      this.post.badge = post['Table1'][0].badge;
      this.post.postType = post['Table1'][0].postType;
      this.post.postDate = post['Table1'][0].postDate;
      this.post.header = post['Table1'][0].header;
      this.post.body = post['Table1'][0].body;
      this.post.media = post['Table1'][0].media;
      this.post.likes = post['Table1'][0].likes;
      this.post.comments = post['Table1'][0].comments;

      this.postLoaded = true;
    });

    this.apiService.getComments(postId).subscribe((comments: any) => {
      let iteration = 0;
      Object.keys(comments['Table1']).forEach((key: any) => {
        this.comments[iteration] = {
          id: comments['Table1'][key].id,
          posterId: comments['Table1'][key].posterId,
          postId: comments['Table1'][key].postId,
          username: comments['Table1'][key].username,
          avatar: comments['Table1'][key].avatar,
          badge: comments['Table1'][key].badge,
          postDate: comments['Table1'][key].postDate,
          body: comments['Table1'][key].body,
          likes: comments['Table1'][key].likes
        };
        iteration++;
      });

      this.commentsLoaded = true;
    });
  }

  get isLoading(): boolean {
    return !(this.postLoaded && this.commentsLoaded);
  }
}
