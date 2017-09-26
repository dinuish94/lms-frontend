import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {

  constructor(private http: Http) {
    console.log("Students service initialized");
  }

  getStudents(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
    .map(res => res.json());
  }

  enrollStudent(enrollmentObj){
    // return this.http.post('https://jsonplaceholder.typicode.com/posts',enrollmentObj)
    // .map(res => res.json());
    return this.http.get('http://localhost:8080/students')
    .map(res => res.json());
  }

}
