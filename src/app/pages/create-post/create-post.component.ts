import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiInterfaceService } from 'src/app/services/api-interface.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html'
})
export class CreatePostComponent implements OnInit {
  fileToUpload: File | null = null;

  username = '';
  avatar = '';
  badge = '';
  type = 'post';
  date = 'just now';
  header = '';
  body = '';
  media = '';
  likes = 0;
  comments = 0;

  fileName = '';

  isPosting = false;

  constructor(
    private cookieService: CookieService,
    private apiService: ApiInterfaceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.cookieService.get('username');
    this.avatar = this.cookieService.get('avatar');
  }

  post(): void {
    this.isPosting = true;
    this.apiService
      .createPost(
        this.cookieService.get('token'),
        Number(this.cookieService.get('userId')),
        this.header.replace(/'/g, "''"),
        this.body.replace(/'/g, "''"),
        this.media
      )
      .subscribe({
        next: (response: any) => {
          let ids = response['Table1'].reverse();
          this.router.navigate(['/post/' + ids[0]['id']]);
        },
        error: (e) => {}
      });
  }

  titleChanged(str: string): void {
    this.header = str;
  }

  bodyChanged(str: string): void {
    this.body = str;
  }

  mediaChanged(str: string): void {
    this.media = str;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('thumbnail', file);

      console.log(file);
      console.log(formData);

      //const upload$ = this.http.post('/api/thumbnail-upload', formData);

      //upload$.subscribe();
    }
  }

  get readyToPost(): boolean {
    return this.header !== '' && this.body !== '';
  }

  get dataOverload(): boolean {
    return this.header.length > 128 || this.body.length > 2000;
  }
}
