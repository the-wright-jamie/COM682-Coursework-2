import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiInterfaceService } from 'src/app/services/api-interface.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../types/post';
import { Comment } from 'src/app/types/comment';

@Component({
  selector: 'app-edit-post-page',
  templateUrl: './edit-post-page.component.html'
})
export class EditPostPageComponent implements OnInit {
  post: Post;
  comment: Comment;

  isComment = false;

  postId = 0;

  isPosting = false;

  isLoading = true;
  notFound = false;

  mode: string | undefined;

  constructor(
    private cookieService: CookieService,
    private apiService: ApiInterfaceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.post = {
      id: 0,
      posterId: 0,
      poster: '',
      avatar: '',
      badge: '',
      postType: 'post',
      postDate: 0,
      header: '',
      body: '',
      media: '',
      likes: 0,
      comments: 0
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
    this.postId = Number(this.route.snapshot.paramMap.get('id')?.toString());

    if (this.mode === 'post') {
      this.apiService.getPost(this.postId).subscribe((post: any) => {
        this.post.poster = this.cookieService.get('username');
        this.post.avatar = this.cookieService.get('avatar');

        try {
          this.post.badge =
            post['Table1'][0].isAdmin == true
              ? 'Site Admin:danger'
              : post['Table1'][0].isModerator == true
              ? 'Moderator:warning'
              : post['Table1'][0].badge;
          this.post.postDate = post['Table1'][0].postDate;
          this.post.header = post['Table1'][0].header;
          this.post.body = post['Table1'][0].body;
          this.post.media = post['Table1'][0].media;
          this.post.likes = post['Table1'][0].likes;
          this.post.comments = post['Table1'][0].comments;

          this.isLoading = false;
        } catch (e) {
          this.notFound = true;
          this.isLoading = false;
        }
      });
    } else {
      this.isComment = true;
      this.apiService.getComment(this.postId).subscribe((comment: any) => {
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
        } catch (e) {
          this.notFound = true;
          this.isLoading = false;
        }
        this.isLoading = false;
      });
    }
  }

  update(): void {
    this.isPosting = true;
    if (!this.isComment) {
      this.apiService
        .editPost(
          this.cookieService.get('token'),
          Number(this.cookieService.get('userId')),
          this.post.header.replace(/'/g, "''"),
          this.post.body.replace(/'/g, "''"),
          this.post.media,
          this.postId
        )
        .subscribe({
          next: (response: any) => {
            this.router.navigate(['/post/' + this.postId]);
          },
          error: (e) => {}
        });
    } else {
      this.apiService
        .editComment(
          this.cookieService.get('token'),
          Number(this.cookieService.get('userId')),
          this.post.id,
          this.comment.body.replace(/'/g, "''")
        )
        .subscribe({
          next: (response: any) => {
            this.router.navigate(['/post/' + this.post.id]);
          },
          error: (e: any) => {}
        });
    }
  }

  titleChanged(str: string): void {
    this.post.header = str;
  }

  bodyChanged(str: string): void {
    if (!this.isComment) {
      this.post.body = str;
    } else {
      this.comment.body = str;
    }
  }

  mediaChanged(str: string): void {
    this.post.media = str;
  }

  get readyToPost(): boolean {
    if (!this.isComment) {
      return this.post.header !== '' && this.post.body !== '';
    } else {
      return this.comment.body !== '';
    }
  }

  get dataOverload(): boolean {
    if (!this.isComment) {
      return this.post.header.length > 128 || this.post.body.length > 2000;
    } else {
      return this.comment.body.length > 2000;
    }
  }
}
