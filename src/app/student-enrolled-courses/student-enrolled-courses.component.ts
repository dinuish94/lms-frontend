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
  providers : [CourseService, StudentService]
})
export class StudentEnrolledCoursesComponent implements OnInit {

  studentId : number;
  student : Student;
  courses : Course[];

  constructor(private courseService:CourseService, private studentService : StudentService) {
    let userObj = localStorage.getItem("authUser");
    let user = JSON.parse(userObj);
    this.studentId = user.id;
  }

  ngOnInit() {
    this.getEnrolledCourses();
  }

  getEnrolledCourses(){
    this.studentService.getStudent(this.studentId).subscribe(student=>{
        console.log(student.courses);
        this.courses = student.courses;
        this.student = student;
    });
  }

  

}

interface Course{
  cId : number;
  title : string;
  description : string;
}
