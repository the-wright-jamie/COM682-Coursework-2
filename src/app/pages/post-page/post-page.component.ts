import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiInterfaceService } from '../../services/api-interface.service';
import { Post } from '../../types/post';
import { Comment } from '../../types/comment';
import { StatusCheckerService } from 'src/app/services/status-checker.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html'
})
export class PostPageComponent implements OnInit {
  post: Post;
  comments: Comment[];

  isFound = false;
  postLoaded = false;
  hasComments = false;
  commentsLoaded = false;
  isPosting = false;

  comment = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiInterfaceService,
    private statusService: StatusCheckerService,
    private cookieService: CookieService
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
      try {
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

        this.isFound = true;
      } catch (e) {
        //TODO don't fail silently!
      }
      this.postLoaded = true;
    });

    this.apiService.getComments(postId).subscribe((comments: any) => {
      let iteration = 0;
      try {
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
          this.hasComments = true;
          iteration++;
        });
      } catch (e) {
        this.hasComments = false;
      }
      this.commentsLoaded = true;
    });
  }

  postComment() {
    this.isPosting = true;
    this.apiService
      .createComment(
        this.cookieService.get('token'),
        Number(this.cookieService.get('userId')),
        Number(this.route.snapshot.paramMap.get('id')?.toString()),
        this.comment.replace("'", "''")
      )
      .subscribe({
        next: () => {
          window.location.reload();
        },
        error: (e) => {}
      });
  }

  commentChanged(str: string) {
    this.comment = str;
  }

  get isLoading(): boolean {
    return !(this.postLoaded && this.commentsLoaded);
  }

  get isSignedIn(): boolean {
    return this.statusService.isSignedIn;
  }

  get readyToPost(): boolean {
    return this.comment !== '';
  }

  get dataOverload(): boolean {
    return this.comment.length > 2000;
  }
}
