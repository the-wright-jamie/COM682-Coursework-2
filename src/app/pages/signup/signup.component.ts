import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiInterfaceService } from 'src/app/services/api-interface.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  constructor(
    private apiService: ApiInterfaceService,
    private router: Router
  ) {}
  username = '';
  email = '';
  password = '';
  birthday = '';

  isCreating = false;

  ngOnInit(): void {}

  create() {
    this.isCreating = true;
    let [day, month, year] = this.birthday.split('/');
    let date = new Date(+year, +month - 1, +day);

    this.apiService
      .createUser(
        this.username,
        this.email,
        this.password,
        Math.round(date.valueOf() / 1000)
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  usernameChanged(str: string): void {
    this.username = str;
  }

  emailChanged(str: string): void {
    this.email = str;
  }

  passwordChanged(str: string): void {
    this.password = str;
  }

  birthdayChanged(str: string): void {
    this.birthday = str;
  }

  get ready(): boolean {
    return this.username !== '' && this.email !== '' && this.password !== '';
  }

  get dataOverload(): boolean {
    return this.username.length > 24 || this.email.length > 255;
  }
}
