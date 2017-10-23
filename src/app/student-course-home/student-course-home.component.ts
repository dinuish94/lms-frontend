import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course/course.service';
import { StudentService } from '../services/student/student.service';
import { Student } from '../models/student.model';
import { Assignment } from '../models/assignment.model';
import { Http } from '@angular/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-student-course-home',
  templateUrl: './student-course-home.component.html',
  styleUrls: ['./student-course-home.component.css'],
  providers : [CourseService, StudentService]
})
export class StudentCourseHomeComponent implements OnInit {

  studentId : number;
  student : Student;
  course : Course[];
  courseId : number;
  assignments : Assignment[];
  uploadedAssignments : Assignment[];
  file : File;
  uploadAssignment : UploadAssignment;


  constructor(private route: ActivatedRoute, private courseService:CourseService, private studentService : StudentService) {
    let userObj = localStorage.getItem("authUser");
    let user = JSON.parse(userObj);
    this.studentId = user.id;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params['cId']; // --> Name must match wanted parameter
    });

    this.getCourse();
  }

  getCourse(){
    this.courseService.getCourseById(this.courseId).subscribe(course=>{
       // console.log(course);
        this.course = course;
        this.assignments = course.assignments;
        console.log(this.assignments);
    });
  }

  getStudent(){
    this.studentService.getStudent(this.studentId).subscribe(student=>{
        this.student = student;
        this.uploadedAssignments = student.assignments;
        console.log(this.uploadedAssignments);
    });
  }


  uploadAssignmentFile(assignId){
    console.log(assignId);

    this.uploadAssignment.assignId= assignId;
    this.uploadAssignment.courseId = this.courseId;
    this.uploadAssignment.studentId = this.studentId;
    this.uploadAssignment.file = this.file;

    console.log(this.uploadAssignment);




  }

  fileChange(event){
    let uploadAssignment : UploadAssignment;
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.file = fileList[0];
    }
   // console.log(this.file);  
  }

}

interface Course{
  cId : number;
  title : string;
  description : string;
}

interface UploadAssignment{
  assignId : number;
  studentId : number;
  courseId : number;
  file : File;
}
