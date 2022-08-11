import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiInterfaceService } from 'src/app/services/api-interface.service';

@Component({
  selector: 'app-search-for-user-page',
  templateUrl: './search-for-user-page.component.html'
})
export class SearchForUserPageComponent implements OnInit {
  users: any;

  constructor(private apiService: ApiInterfaceService, private router: Router) {
    this.users = [];
  }

  isLoading = false;
  noResult = false;

  ngOnInit(): void {}

  search(form: NgForm) {
    this.isLoading = true;
    this.noResult = false;

    this.apiService.getUsers(form.value['username']).subscribe((users: any) => {
      let iteration = 0;
      try {
        users['Table1'].forEach((user: any) => {
          this.users[iteration] = user['username'];
          iteration++;
        });

        if (this.users.length == 1) {
          this.router.navigate(['/u/' + this.users[0]]);
        }
      } catch (e) {
        this.noResult = true;
      }
      this.isLoading = false;
    });
  }
}
