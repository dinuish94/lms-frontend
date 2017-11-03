import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course/course.service';
import { StudentService } from '../services/student/student.service';
// import { Course } from '../models/course.model';
import { Http } from '@angular/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css'],
  providers: [CourseService, StudentService]
})
export class StudentCoursesComponent implements OnInit {

  studentId: number;
  courses: Course[];
  selectedCourse: Course;
  searchCourses: Course[];
  tempCourses: Course[];
  enrolledCourses: Course[];
  courseCompArray: number[] = [];

  constructor(private courseService: CourseService, private studentService: StudentService) {
    let userObj = localStorage.getItem("authUser");
    let user = JSON.parse(userObj);
    this.studentId = user.id;
  }

  enrollStudent(courseId) {

    swal({
      title: 'Are you sure?',
      text: 'You will be enrolled in this course!',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Enroll Me!',
      cancelButtonText: 'No thanks!'
    }).then(() => {
        let enrollmentObj = { "cId": courseId, "sId": this.studentId };
        this.studentService.enrollStudent(enrollmentObj).subscribe(() => {
        swal(
          'Success!',
          ' You are now Enrolled to the course',
          'success'
        )
        this.enrolledCourses = null;
        this.courses=null;
        this.tempCourses=null;
        this.getCourses();
      });

    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
      }
    })
  }

  getCourse(courseId) {
    this.selectedCourse = null;
    this.courseService.getCourseById(courseId).subscribe(course => {
      this.selectedCourse = course;
    });
  }

  ngOnInit() {

    this.getCourses();
    //this.getStudent();
    //this.getEnrolledCourses();
  }

  // getStudent(){
  //   this.studentService.getStudent(this.studentId).subscribe(student=>{
  //     console.log(student.courses);

  //   });
  // }

  getEnrolledCourses() {
    this.studentService.getEnrolledCourses(this.studentId).subscribe(courses => {
      this.enrolledCourses = courses;
      console.log(this.enrolledCourses);
      return this.disableCourse();
    });
  }

  disableCourse() {
    this.compArray(this.courses, this.enrolledCourses);
  }

  compArray(a, b) {
    for (let i = 0; i < a.length; i++) {
      for (let k = 0; k < b.length; k++) {
        if (a[i].cId == b[k].cId) {
          this.courseCompArray.push(a[i].cId);
          a[i].flag=true;
        }
      }
    }
    console.log(this.courses);
  }

  getCourses() {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
      this.tempCourses = courses;
      return this.getEnrolledCourses();
    });
  }

  searchCourse(value) {
    this.courses = [];
    this.courses = this.tempCourses;
    this.searchCourses = [];
    let val = value;
    var patt = new RegExp(val, "i");
    this.courses.forEach(course => {
      if (patt.test(course.title)) {
        this.searchCourses.push(course);
      }
    });
    this.courses = [];
    this.courses = this.searchCourses;
  }

  onKeyDownSearch(input) {
    return this.searchCourse(input);
  }
}

interface Course {
  cId: number;
  title: string;
  description: string;
  name: String;
}
