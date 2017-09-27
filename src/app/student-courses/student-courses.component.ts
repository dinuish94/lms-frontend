import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course/course.service';
import { StudentService } from '../services/student/student.service';
import { Http } from '@angular/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css'],
  providers : [CourseService, StudentService]
})
export class StudentCoursesComponent implements OnInit {

  studentId : number;
  courses : Course[];
  selectedCourse : Course;
  searchCourses : Course[];
  tempCourses : Course[];
  // private studentService : StudentService;
  
    constructor(private courseService:CourseService, private studentService : StudentService) {
      let userObj = localStorage.getItem("authUser");
      let user = JSON.parse(userObj);
      this.studentId = user.id;
    }

    enrollStudent(courseId){

      swal({
        title: 'Are you sure?',
        text: 'You will be enrolled in this course!',
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Enroll Me!',
        cancelButtonText: 'No thanks!'
      }).then(()=> {
        let enrollmentObj = {"cId":courseId, "sId":this.studentId};
        this.studentService.enrollStudent(enrollmentObj).subscribe(()=>{
         // console.log(data);
          swal(
            'Success!',
            ' You are now Enrolled to the course',
            'success'
          )
        });
        
      }, function(dismiss) {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === 'cancel') {
        }
      })

          

    }

    unEnrollStudent(courseId){
      swal({
        title: 'Are you sure?',
        text: 'You will be no longer Enrolled in the course',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, UnEnroll Me!',
        cancelButtonText: 'Cancel!'
      }).then(()=> {
        let enrollmentObj = {"cId":courseId, "sId":this.studentId};
        this.studentService.unEnrollStudent(enrollmentObj).subscribe(()=>{
         // console.log(data);
          swal(
            'Success!',
            ' You have been successfully UnEnrolled',
            'error'
          )
        });
        
      }, function(dismiss) {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === 'cancel') {
        }
      })
    }

    getCourse(courseId){
      console.log(courseId);
      this.selectedCourse =null;
      this.courseService.getCourseById(courseId).subscribe(course=>{
        this.selectedCourse = course;
      });
    }

  ngOnInit() {
   
    this.getCourses();
  }

  getCourses(){
    this.courseService.getCourses().subscribe(courses=>{
      console.log(courses);
      this.courses = courses;
      this.tempCourses = courses;
    });
  }

  searchCourse(value){
    
    this.courses = [];
    this.courses=this.tempCourses;
    this.searchCourses=[];
    let val = value;
    var patt = new RegExp(val,"i");
    this.courses.forEach(course=>{
      if(patt.test(course.title)){
        this.searchCourses.push(course);
      }
    });
    this.courses = [];
    this.courses=this.searchCourses;
   console.log(this.searchCourses);

  }

}

interface Course{
  cId : number;
  title : string;
  description : string;
}
