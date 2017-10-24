import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Assignment } from '../models/assignment.model';
import { TeacherAssignmentsService } from '../teacher-assignments/teacher-assignments.service';

@Component({
  selector: 'app-teacher-assignments',
  templateUrl: './teacher-assignments.component.html',
  styleUrls: ['./teacher-assignments.component.css'],
  providers: [ TeacherAssignmentsService ] 
})
export class TeacherAssignmentsComponent implements OnInit {

  assignment: Assignment = new Assignment();
  assignments: Assignment[];
  cId: number;
  assignId: number;

  constructor(private _route:ActivatedRoute, private _teacherAssignmentService:TeacherAssignmentsService) { }

  ngOnInit() {
    this.cId = this._route.snapshot.params['cId']; 
    this.assignId = this._route.snapshot.params['assignId'];       
    this.getAssignments(); 
    this.getAssignmentById();
  }

  getAssignments(){
    this._teacherAssignmentService.getAllAssignments(this.cId).subscribe(assignments => {
      this.assignments = assignments;
    });
  }

  getAssignmentById(){
    this._teacherAssignmentService.getAssignmentbyId(this.assignId).subscribe(assignment => {
      this.assignment = assignment;
      this.assignment.startDate = new Date(assignment.startDate);
      this.assignment.endDate = new Date(assignment.endDate);
    });
  }

  editAssignment(){
    this._teacherAssignmentService.updateAssignment(this.assignId, this.assignment).subscribe(assignment => {
      
    })
  }

  // fileChange(event) {
  //   let fileList: FileList = event.target.files;
  //   if(fileList.length > 0) {
  //       let file: File = fileList[0];
  //       let formData:FormData = new FormData();
  //       formData.append('uploadFile', file, file.name);
  //       let headers = new Headers();
  //       /** No need to include Content-Type in Angular 4 */
  //       headers.append('Content-Type', 'multipart/form-data');
  //       headers.append('Accept', 'application/json');
  //       let options = new RequestOptions({ headers: headers });
  //       this.http.post(`${this.apiEndPoint}`, formData, options)
  //           .map(res => res.json())
  //           .catch(error => Observable.throw(error))
  //           .subscribe(
  //               data => console.log('success'),
  //               error => console.log(error)
  //           )
  //   }
// }

}
