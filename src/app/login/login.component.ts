import { Component, OnInit } from '@angular/core';
import { ApiInterfaceService } from '../api-interface.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInError = '';

  constructor(private apiService: ApiInterfaceService) {}

  ngOnInit(): void {
    this.apiService.login('jamesw-65', '').subscribe({
      error: (e) => {
        this.signInError = e.error;
      },
      complete: () => {
        console.info('complete');
      }
    });
  }
}
