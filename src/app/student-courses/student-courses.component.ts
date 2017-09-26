import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course/course.service';
import { StudentService } from '../services/student/student.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css'],
  providers : [CourseService, StudentService]
})
export class StudentCoursesComponent implements OnInit {

  courses : Course[];
  selectedCourse : Course;
  searchCourses : Course[];
  tempCourses : Course[];
  // private studentService : StudentService;
  
    constructor(private courseService:CourseService, private studentService : StudentService) {}

    enrollStudent(courseId){
      let studentId = localStorage.getItem("studentId");
      //console.log(courseId+" : "+studentId);

      let enrollmentObj = {"courseId":courseId, "studentId":studentId};
      this.studentService.enrollStudent(enrollmentObj).subscribe(data=>{
       // console.log(data[0].name);
      });

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
