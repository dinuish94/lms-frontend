import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseService {

  constructor(private http: Http) {
    console.log("Course service initialized");
  }

  getCourses(){
    return this.http.get('http://localhost:8080/courses/')
    .map(res => res.json());
  }

  getCourseById(courseId){
    return this.http.get('http://localhost:8080/courses/'+courseId)
    .map(res => res.json());
  }

  getAssignments(courseId){
    return this.http.get('http://localhost:8080/courses/'+courseId+'/assignments')
    .map(res => res.json());
  }

}
