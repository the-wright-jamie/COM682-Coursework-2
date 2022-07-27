import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiInterfaceService {
  static getUsers() {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  getUsers(): any {
    fetch('https://prod-07.centralus.logic.azure.com/workflows/63b275e33bbb4b2a984328df60a40185/triggers/manual/paths/invoke/api/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=KkpOOmYz9TVi1bz-sHXTLfjYX8SRPYuiaLvEoLLvQ0g').then(r => r.json()).then(j => { return j.value; });
  }
}
