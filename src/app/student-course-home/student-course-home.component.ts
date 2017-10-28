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
  currentDate : number;
  b : any;


  constructor(private route: ActivatedRoute, private courseService:CourseService, private studentService : StudentService) {
    let userObj = localStorage.getItem("authUser");
    let user = JSON.parse(userObj);
    this.studentId = user.id;
    this.currentDate = Date.now();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params['cId'];
    });

    this.getAssignmentsForCourse();
    //this.getCourse();
    //this.getStudent();
  }

  // getCourse(){
  //   this.courseService.getCourseById(this.courseId).subscribe(course=>{
  //       this.course = course;
  //       this.assignments = course.assignments;
  //       console.log(course);
  //       return this.getStudent();
  //   });
  // } 

  getAssignmentsForCourse(){
    this.courseService.getAssignments(this.courseId).subscribe(assignments=>{
      this.assignments = assignments;
      //return this.getStudent();
      return this.getAssignmentsForStudent();
    }); 
  }

  getAssignmentsForStudent(){
    this.studentService.getAssignments(this.studentId).subscribe(assignments=>{
      console.log(assignments.length);
    }); 
  }

  getStudent(){
    this.studentService.getStudent(this.studentId).subscribe(student=>{
        this.student = student;
        console.log("SID");
        console.log(student.studentAssignment);
        this.uploadedAssignments = student.studentAssignment;
        // return this.disableAssignment();
    });
  }

  disableAssignment(){
    console.log("cdscdscdscdscds");
    console.log(this.assignments);
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


  uploadAssignmentFiles(assignId){
   // console.log("Inside UploadAssFile Component");
    let sId = this.studentId.toString();
    let aId = assignId.toString();
    this.studentService.uploadAssignment(this.file,aId,sId).subscribe(()=>{
      console.log("Success");
    });
  

  }


  uploadAssignmentFile(assignId){
    // console.log("Inside UploadAssFile Component");
     let sId = this.studentId.toString();
     let aId = assignId.toString();
     let assignmentFile : File = this.file;
     this.file=null;

     if(assignmentFile == null){
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
    }).then(()=> {
      this.studentService.uploadAssignment(assignmentFile,aId,sId).subscribe(()=>{
        console.log("Success");
        swal(
          'Success!',
          ' You are now Enrolled to the course',
          'success'
        );
        window.location.reload();
      });
    }, function(dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
      }
    })
   
 
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
