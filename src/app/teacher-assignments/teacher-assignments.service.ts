import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Assignment } from '../models/assignment.model'

@Injectable()
export class TeacherAssignmentsService {

  constructor(private _http: Http) { }
  
    private _addAssignmentURL = 'http://localhost:8080/assignments/';
    private _getAssignmentsForCourseURL = 'http://localhost:8080/courses/';
  
    addNewAssignment(assignment: Assignment): Observable<Assignment> {
      return this._http.post(this._addAssignmentURL, assignment)
        .map((response: Response) => <Assignment>response.json())
    }

    getAllAssignments(courseId: number): Observable<Assignment[]> {
      return this._http.get(this._getAssignmentsForCourseURL + courseId + '/assignments')
        .map((response: Response) => response.json())
        .do(data => console.log(JSON.stringify(data)));
    }

    getAssignmentbyId(assignId: number): Observable<Assignment> {
      return this._http.get(this._addAssignmentURL + assignId)
        .map((response: Response) => response.json())
        .do(data => console.log(JSON.stringify(data)));
    }

    updateAssignment(assignId: number, assignment: Assignment): Observable<Assignment> {
      return this._http.put(this._addAssignmentURL + assignId, assignment)
        .map((response: Response) => response.json())
        .do(data => console.log(JSON.stringify(data)));
    } 
}
