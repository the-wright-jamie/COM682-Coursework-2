import { Component, OnInit } from '@angular/core';
import posts from '../posts.json'

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css'],
})
export class NewsFeedComponent implements OnInit {
  loadingMessage = "";
  isLoading = true;

  data: any; //TODO FIX!!!!!!

  constructor() { }

  ngOnInit(): void {
    this.data = posts;

    this.loadingMessage = "Now loading";
    this.isLoading = false;
  }

  getRandomInt(min: number, max: number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

}
