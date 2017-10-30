import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course/course.service';
import { StudentService } from '../services/student/student.service';
import { Student } from '../models/student.model';
import { Http } from '@angular/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-student-enrolled-courses',
  templateUrl: './student-enrolled-courses.component.html',
  styleUrls: ['./student-enrolled-courses.component.css'],
  providers: [CourseService, StudentService]
})
export class StudentEnrolledCoursesComponent implements OnInit {

  studentId: number;
  student: Student;
  courses: Course[];

  constructor(private courseService: CourseService, private studentService: StudentService) {
    let userObj = localStorage.getItem("authUser");
    let user = JSON.parse(userObj);
    this.studentId = user.id;
  }

  ngOnInit() {
    this.getEnrolledCourses();
  }

  getEnrolledCourses() {
    this.studentService.getStudent(this.studentId).subscribe(student => {
      console.log(student.courses);
      this.courses = student.courses;
      this.student = student;
    });
  }


  unEnrollStudent(courseId) {
    swal({
      title: 'Are you sure?',
      text: 'You will be no longer Enrolled in the course',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, UnEnroll Me!',
      cancelButtonText: 'Cancel!'
    }).then(() => {
      let enrollmentObj = { "cId": courseId, "sId": this.studentId };
      this.studentService.unEnrollStudent(enrollmentObj).subscribe(() => {
        // console.log(data);
        swal(
          'Success!',
          ' You have been successfully UnEnrolled',
          'error'
        )
        this.courses = null;
        this.getEnrolledCourses();
      });

    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
      }
    })
  }



}

interface Course {
  cId: number;
  title: string;
  description: string;
}
