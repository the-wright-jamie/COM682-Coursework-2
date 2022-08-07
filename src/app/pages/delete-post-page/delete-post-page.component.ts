import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiInterfaceService } from '../../services/api-interface.service';
import { Post } from '../../types/post';
import { Comment } from '../../types/comment';
import { StatusCheckerService } from 'src/app/services/status-checker.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-delete-post-page',
  templateUrl: './delete-post-page.component.html'
})
export class DeletePostPageComponent implements OnInit {
  post: Post;
  comment: Comment;

  isFound = false;
  postLoaded = false;
  hasComments = false;
  commentsLoaded = false;
  isPosting = false;
  isComment = false;
  error = '';
  mode: string | undefined;

  comments = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiInterfaceService,
    private statusService: StatusCheckerService,
    private cookieService: CookieService
  ) {
    this.mode = '';
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
    this.comment = {
      id: 0,
      postId: 0,
      posterId: 0,
      postDate: 0,
      body: '',
      likes: 0,
      username: '',
      avatar: '',
      badge: ''
    };
  }

  ngOnInit(): void {
    this.mode = this.route.snapshot.routeConfig?.path?.split('/')[0];
    let postId = Number(this.route.snapshot.paramMap.get('id')?.toString());

    if (this.mode === 'post') {
      this.apiService.getPost(postId).subscribe((post: any) => {
        try {
          this.post.id = post['Table1'][0].id;
          this.post.poster = post['Table1'][0].username;
          this.post.avatar = post['Table1'][0].avatar;
          this.post.badge =
            post['Table1'][0].isAdmin == true
              ? 'Site Admin:danger'
              : post['Table1'][0].isModerator == true
              ? 'Moderator:warning'
              : post['Table1'][0].badge;
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
    } else {
      this.isComment = true;
      this.apiService.getComment(postId).subscribe((comment: any) => {
        try {
          this.comment = {
            id: comment['Table1'][0].id,
            posterId: comment['Table1'][0].posterId,
            postId: comment['Table1'][0].postId,
            username: comment['Table1'][0].username,
            avatar: comment['Table1'][0].avatar,
            badge:
              comment['Table1'][0].isAdmin == true
                ? 'Site Admin:danger'
                : comment['Table1'][0].isModerator == true
                ? 'Moderator:warning'
                : comment['Table1'][0].badge,
            postDate: comment['Table1'][0].postDate,
            body: comment['Table1'][0].body,
            likes: comment['Table1'][0].likes
          };

          this.post.id = this.comment.postId;

          this.isFound = true;
        } catch (e) {
          //TODO don't fail silently!
        }
        this.postLoaded = true;
      });
    }
  }

  delete() {
    this.postLoaded = false;
    if (!this.isComment) {
      this.apiService
        .deletePost(
          this.cookieService.get('token'),
          this.post.id,
          Number(this.cookieService.get('userId'))
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (e) => {
            this.postLoaded = true;
            this.error =
              'Unable to delete, you may not be authorised to do so.';
            console.log(e);
          }
        });
    } else {
      this.apiService
        .deleteComment(
          this.cookieService.get('token'),
          this.comment.id,
          Number(this.cookieService.get('userId'))
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/post/' + this.post.id]);
          },
          error: (e) => {
            this.postLoaded = true;
            this.error =
              'Unable to delete, you may not be authorised to do so.';
            console.log(e);
          }
        });
    }
  }

  get isLoading(): boolean {
    return !this.postLoaded;
  }

  get isSignedIn(): boolean {
    return this.statusService.isSignedIn;
  }
}
