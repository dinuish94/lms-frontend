import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Course} from '../models/course.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class TeacherService {

  constructor(private _http: Http) { }

  courses: Course[] = [];

  private _courseurl='http://localhost:8080/teachers/';

  getAllCourses(id:number): Observable<Course[]> {
    return this._http.get(this._courseurl+id+'/courses')
    .map((response: Response) => <Course[]> response.json())
    .do(data => console.log(JSON.stringify(data)));
  }
}
