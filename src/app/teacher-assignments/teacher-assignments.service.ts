import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Assignment } from '../models/assignment.model';
import { Submission } from '../models/submission.model';
import { Grade } from '../models/grade.model';

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

    getStudentSubmissions(assignId: number): Observable<Submission[]> {
      return this._http.get(this._addAssignmentURL+"student-assignments/"+assignId)
      .map((response: Response) => response.json())
      .do(data => JSON.stringify(data))
      
    }

    downloadStudentSubmission(assignId:number, fileName: string){
      return this._http.get(this._addAssignmentURL+"student-assignments/"+assignId+"/file?fileName="+encodeURIComponent(fileName))
      .map((response: Response) => response)
      .do(data=> console.log(JSON.stringify(data)))
    }

    addStudentMarks(assignId: number, grade:Grade){
      return this._http.post(this._addAssignmentURL+assignId+"/marks",grade)
        .map((response: Response) => response)
        .do(data => console.log(JSON.stringify(data)))
    }

    addFeedback(assignId: number, grade:Grade){
      return this._http.post(this._addAssignmentURL+assignId+"/feedback",grade)
      .map((response: Response) => response)
      .do(data => console.log(JSON.stringify(data)))
    }

    getCourseStudentCount(courseId: number){
      return this._http.get(this._getAssignmentsForCourseURL + courseId)
      .map((response: Response) => response.json())
      .do(data => console.log(JSON.stringify(data)));
    }


}
