import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiInterfaceService } from '../api-interface.service';
import { Post } from '../post';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewsFeedComponent implements OnInit {
  loadingMessage = '';
  isLoading = true;
  posts: Post[];

  data: any; //TODO FIX!!!!!!

  constructor(private apiService: ApiInterfaceService) {
    this.posts = [];
    this.data = [];
  }

  ngOnInit(): void {
    this.apiService.getPosts(1).subscribe((posts: any) => {
      let iteration = 0;
      Object.keys(posts['Table1']).forEach((key: any) => {
        this.posts[iteration] = {
          id: posts['Table1'][key].id,
          posterId: posts['Table1'][key].posterId,
          poster: posts['Table1'][key].username,
          avatar: posts['Table1'][key].avatar,
          postType: posts['Table1'][key].postType,
          postDate: posts['Table1'][key].postDate,
          header: posts['Table1'][key].header,
          body: posts['Table1'][key].body,
          media: posts['Table1'][key].media,
          comments: posts['Table1'][key].comments,
          likes: posts['Table1'][key].likes
        };
        iteration++;
      });
      this.isLoading = false;
    });
  }
}
