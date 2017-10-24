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
  assignIds : number[] =[];
  b : any;


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
    //this.getStudent();
  }

  getCourse(){
    this.courseService.getCourseById(this.courseId).subscribe(course=>{
        this.course = course;
        this.assignments = course.assignments;
        return this.getStudent();
    });
  }

  getStudent(){
    this.studentService.getStudent(this.studentId).subscribe(student=>{
        this.student = student;
        this.uploadedAssignments = student.studentAssignment;
       //  return this.disableAssignment();
    });
  }

  disableAssignment(){
    this.compArray(this.assignments, this.uploadedAssignments);
  }

  compArray(a : Assignment[], b){
    console.log("COMP ARR");
    for(let i=0;i<a.length;i++){
      for(let k=0;k<b.length;k++){
        console.log(a);
        console.log(b[k].assignment);
        
        if(a[i].assignId == b[k].assignment.assignId){
          this.assignIds.push(a[i].assignId);
        }
       
      }
    }

    console.log(this.assignIds);
   
  }


  uploadAssignmentFile(assignId){
   // console.log("Inside UploadAssFile Component");
    let sId = this.studentId.toString();
    let aId = assignId.toString();
    this.studentService.uploadAssignment(this.file,aId,sId).subscribe(()=>{
      console.log("Success");
    });
  

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
