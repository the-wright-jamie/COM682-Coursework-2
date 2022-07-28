import { Component, OnInit } from '@angular/core';
import { ApiInterfaceService } from '../api-interface.service';
import { Post } from '../posts';
import { User } from '../users';
//import posts from '../posts.json'
//import comments from '../comments.json';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  loadingMessage = '';
  isLoading = true;
  users: User[];
  posts: Post[];

  data: any; //TODO FIX!!!!!!

  constructor(private apiService: ApiInterfaceService) {
    this.users = [];
    this.posts = [];
  }

  async ngOnInit(): Promise<void> {
    this.apiService.getUsers().subscribe((users: any) => {
      this.apiService.getPosts().subscribe((posts: any) => {
        this.apiService.getLikes(0, false).subscribe((likes: any) => {
          this.apiService.getComments(0).subscribe((responses: any) => {
            let iteration = 0;
            Object.keys(users['value']).forEach((key: any) => {
              this.users[iteration] = {
                id: users['value'][key].id,
                username: users['value'][key].username,
                emailAddress: users['value'][key].emailAddress,
                avatar: users['value'][key].avatar,
                badge: users['value'][key].badge,
                birthday: users['value'][key].birthday,
                accountCreation: users['value'][key].accountCreation,
                isDeleted: users['value'][key].isDeleted,
                isMuted: users['value'][key].isMuted,
                isBanned: users['value'][key].isBanned,
                isModerator: users['value'][key].isModerator,
                isAdmin: users['value'][key].isAdmin
              };
              iteration++;
            });
            iteration = 0;
            Object.keys(posts['value']).forEach((key: any) => {
              this.posts[iteration] = {
                id: posts['value'][key].id,
                posterId: posts['value'][key].posterId,
                postType: posts['value'][key].postType,
                postDate: posts['value'][key].postDate,
                header: posts['value'][key].header,
                body: posts['value'][key].body,
                media: posts['value'][key].media
              };
              iteration++;
            });
            console.log(this.users);
            console.log(this.posts);
            this.isLoading = false;
          });
        });
      });
    });
  }
}
