import { Component, OnInit } from '@angular/core';

// Get developer excuse
async function getDeveloperExcuse() {
  try {
    const res = await fetch("https://api.tabliss.io/v1/developer-excuses");
    const body = await res.json();

    return {
      quote: body.data,
    };
  } catch (err) {
    return {
      quote: "Unable to get a new developer excuse.",
    };
  }
}

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  error = "...";

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.error = (await getDeveloperExcuse()).quote;
  }

  getRandomInt(min: number, max: number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }
}
