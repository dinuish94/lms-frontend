import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private http: Http) {
    console.log("Login service initialized");
  }

  authenticate(authObj){
    return this.http.post('http://localhost:8080/login',authObj)
    .map(res => res.json());
  }
}
