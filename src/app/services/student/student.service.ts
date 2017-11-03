import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {

  constructor(private http: Http) {
    console.log("Students service initialized");
  }

  getStudents(){
    return this.http.get('http://localhost:8080/students')
    .map(res => res.json());
  }

  enrollStudent(enrollmentObj){
    // return this.http.get('https://jsonplaceholder.typicode.com/posts')
    // .map(res => res.json());
    return this.http.post('http://localhost:8080/students/courses',enrollmentObj)
    .map(res => res);
  }

  
  unEnrollStudent(enrollmentObj){
    // return this.http.get('https://jsonplaceholder.typicode.com/posts')
    // .map(res => res.json());
    let cId = enrollmentObj.cId;
    let sId = enrollmentObj.sId;

    return this.http.delete('http://localhost:8080/students/'+sId+'/courses/'+cId)
    .map(res => res);
  }

  
  getStudent(studentId){
    return this.http.get('http://localhost:8080/students/'+studentId)
    .map(res => res.json());
  }

  updateStudent(id,student) {
    return this.http.put('http://localhost:8080/students/'+id,student)
    .map(response => response.json());
  }

}
