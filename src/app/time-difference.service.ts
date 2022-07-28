import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeDifferenceService {
  constructor() {}

  // credits to https://stackoverflow.com/a/6109105 for this function
  calculate(timePosted: number | string): string {
    if (typeof timePosted === 'string') {
      return timePosted;
    } else {
      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      let d = new Date();
      const unixtime = d.valueOf();

      var elapsed = unixtime - timePosted;

      if (elapsed < msPerMinute) {
        let num = Math.round(elapsed / 1000);
        return num > 1 ? num + ' seconds ago' : num + ' second ago';
      } else if (elapsed < msPerHour) {
        let num = Math.round(elapsed / msPerMinute);
        return num > 1 ? num + ' minutes ago' : num + ' minute ago';
      } else if (elapsed < msPerDay) {
        let num = Math.round(elapsed / msPerHour);
        return num > 1 ? num + ' hours ago' : num + ' hour ago';
      } else if (elapsed < msPerMonth) {
        let num = Math.round(elapsed / msPerDay);
        return num > 1 ? 'about ' + num + ' days ago' : 'about ' + num + ' day ago';
      } else if (elapsed < msPerYear) {
        let num = Math.round(elapsed / msPerMonth);
        return num > 1 ? 'about ' + num + ' months ago' : 'about ' + num + ' month ago';
      } else {
        let num = Math.round(elapsed / msPerYear);
        return num > 1 ? 'about ' + num + ' years ago' : 'about ' + num + ' year ago';
      }
    }
  }
}
