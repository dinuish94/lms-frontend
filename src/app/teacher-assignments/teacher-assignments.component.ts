import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Assignment } from '../models/assignment.model';
import { TeacherAssignmentsService } from '../teacher-assignments/teacher-assignments.service';
import { Submission } from '../models/submission.model';
import { Grade } from '../models/grade.model';
import swal from 'sweetalert2';

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
  file: File;

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

    swal({
      title: 'Are you sure?',
      text: 'Marks will be assigned to this student!',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then(() => {
      this._teacherAssignmentService.addStudentMarks(this.assignId, this.grade).subscribe(() => {
        swal({
          title: 'Success',
          text: 'Assigned marks Succesfully!',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.reload();
        })
      });
    }, function (dismiss) {
      if (dismiss === 'cancel') {
      }
    })
  }

  addFeedback(){
    this.grade.studentId = this.studentId;
    this.grade.assignId = this.assignId;

    swal({
      title: 'Are you sure?',
      text: 'Feedback will be shown to this student!',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then(() => {
      this._teacherAssignmentService.addFeedback(this.assignId, this.grade).subscribe(() => {
        swal({
          title: 'Success',
          text: 'Feedback Added Succesfully!',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.reload();
        })
      });
    }, function (dismiss) {
      if (dismiss === 'cancel') {
      }
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

  uploadAssignmentFile(assignId) {
    let sId = this.studentId.toString();
    let aId = assignId.toString();
    let assignmentFile: File = this.file;
    this.file = null;

    if (assignmentFile == null) {
      swal(
        'File Not Found!',
        'Choose File to Upload',
        'error'
      )
      return;
    }

    swal({
      title: 'Are you sure?',
      text: 'Your Assignment will be submitted!',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit Assignment!',
      cancelButtonText: 'Cancel!'
    }).then(() => {
      this._teacherAssignmentService.uploadAssignment(assignmentFile, aId, sId).subscribe(() => {
        swal({
          title: 'Success',
          text: 'Uploaded Succesfully!',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.reload();
        })
      });
    }, function (dismiss) {
      if (dismiss === 'cancel') {
      }
    })

  }

  fileChange(event) {
    let uploadAssignment: UploadAssignment;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
    }
  }
}

interface Course {
  cId: number;
  title: string;
  name: string;
  description: string;
}

interface UploadAssignment {
  assignId: number;
  studentId: number;
  courseId: number;
  file: File;
}
