import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { ApiInterfaceService } from 'src/app/services/api-interface.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html'
})
export class EditUserPageComponent implements OnInit {
  @ViewChild('birthday_input')
  birthday_input!: ElementRef;

  user: User;

  password = '';

  birthday = '';

  isFound = false;
  errorFinding = false;
  isCreating = false;
  mediaUploading = false;

  badge = '';
  badgeColour = '';

  error = '';

  minBirthday: string;
  maxBirthday: string;
  birthdayValue = '';

  constructor(
    private apiService: ApiInterfaceService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.minBirthday = moment().subtract('year', 13).format('YYYY-MM-DD');
    this.maxBirthday = moment().subtract('year', 120).format('YYYY-MM-DD');

    this.user = {
      id: 0,
      username: '',
      emailAddress: '',
      avatar: '',
      badge: '',
      birthday: 0,
      accountCreation: 0,
      isMuted: false,
      isBanned: false,
      isModerator: false,
      isAdmin: false
    };
  }

  ngOnInit(): void {
    let urlUser = this.route.snapshot.paramMap.get('id')!.toString();

    this.apiService.getUser(urlUser).subscribe({
      next: (user: any) => {
        try {
          this.user = user['Table1'][0];
          this.user['avatar'] =
            user['Table1'][0]['avatar'] === ''
              ? 'assets/img/default.png'
              : user['Table1'][0]['avatar'];

          if (this.user.isAdmin === true || this.user.isModerator === true) {
            this.badge =
              this.user.isAdmin === true ? 'Site Admin' : 'Moderator';
            this.badgeColour =
              this.user.isAdmin === true ? 'danger' : 'warning';
          } else {
            this.badge = this.user.badge?.split(':')[0];
            this.badgeColour = this.user.badge?.split(':')[1];
          }

          this.birthdayValue = moment
            .unix(this.user.birthday)
            .format('YYYY-MM-DD');

          this.isFound = true;
        } catch (e) {
          this.errorFinding = true;
        }
      },
      error: (e) => {}
    });
  }

  edit() {
    this.isCreating = true;

    this.apiService
      .editUser(
        this.user.username,
        this.user.emailAddress,
        this.password,
        this.user.avatar,
        Number(this.cookieService.get('userId')),
        this.cookieService.get('token')
      )
      .subscribe(() => {
        this.router.navigate(['/u/' + this.user.username]);
      });
  }

  get isLoading(): boolean {
    return !this.isFound;
  }

  usernameChanged(str: string): void {
    this.user.username = str;
  }

  emailChanged(str: string): void {
    this.user.emailAddress = str;
  }

  passwordChanged(str: string): void {
    this.password = str;
  }

  birthdayChanged(str: string): void {
    this.birthday = str;
  }

  onFileSelected(event: any) {
    this.mediaUploading = true;
    const file: File = event.target.files[0];
    var re = /(?:\.([^.]+))?$/;

    if (file) {
      let fileName = file.name;

      const formData = new FormData();

      formData.append('file', file);
      formData.append('fileType', re.exec(fileName)![1]);

      this.apiService.uploadMedia(formData).subscribe((response: any) => {
        this.user.avatar =
          'https://ulsterbook.blob.core.windows.net/user-content/' +
          response.message;

        this.mediaUploading = false;
      });
    }
  }

  get ready(): boolean {
    return (
      this.user.username !== '' &&
      this.user.emailAddress !== '' &&
      this.password !== ''
    );
  }

  get dataOverload(): boolean {
    return (
      this.user.username.length > 24 || this.user.emailAddress.length > 255
    );
  }
}
