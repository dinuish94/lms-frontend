import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Assignment } from '../models/assignment.model';
import { TeacherAssignmentsService } from '../teacher-assignments/teacher-assignments.service';
import { Submission } from '../models/submission.model';
import { Grade } from '../models/grade.model';

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
  submissions: Submission[];
  grade: Grade = new Grade();
  studentId: number;
  studentCount: number;
  submissionCount: number;

  constructor(private _route:ActivatedRoute, private _teacherAssignmentService:TeacherAssignmentsService) { }

  ngOnInit() {
    this.cId = this._route.snapshot.params['cId']; 
    this.assignId = this._route.snapshot.params['assignId'];       
    this.getAssignments(); 
    this.getAssignmentById();
    this.getSubmissions();
    this.getCourseId();
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

  getSubmissions(){
    this._teacherAssignmentService.getStudentSubmissions(this.assignId).subscribe(submissions => {
      console.log(submissions);
      this.submissions = submissions;
      this.submissionCount = submissions.length;
    })
  }

  download(fileName:string){
    this._teacherAssignmentService.downloadStudentSubmission(this.assignId, fileName).subscribe( test => {
      // var file = 
    })
  }

  addStudentMarks(){
    this.grade.studentId = this.studentId;
    this.grade.assignId = this.assignId;
    this._teacherAssignmentService.addStudentMarks(this.assignId, this.grade).subscribe(submissions => {
      this.getSubmissions();
    })
  }

  addFeedback(){
    this.grade.studentId = this.studentId;
    this.grade.assignId = this.assignId;
    this._teacherAssignmentService.addFeedback(this.assignId, this.grade).subscribe(feebacks => {
      this.getSubmissions();
    })

  }

  setStudentId(studentId: number){
    this.studentId = studentId;
  }

  getCourseId(){
    this._teacherAssignmentService.getCourseStudentCount(this.cId).subscribe(data=> {
      this.studentCount = data.students.length;
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
