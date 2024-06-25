// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   constructor(private http:HttpClient) { }
//   todo_api = `https://dummyjson.com/todos`
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private todo_api = `https://dummyjson.com/todos`;

  constructor(private http: HttpClient) { }

  fetchTodos(): Observable<any> {
    return this.http.get(this.todo_api);
  }
}
