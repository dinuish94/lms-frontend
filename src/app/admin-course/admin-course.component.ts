import { Component, OnInit } from '@angular/core';

import { CourseService } from '../services/course/course.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.css']
})
export class AdminCourseComponent implements OnInit {
  courses: any =  new Array();
  newCourse: any = new Object();

  constructor(private _courseService: CourseService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this._courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  addCourse() {
    this._courseService.addCourse(this.newCourse).subscribe(course => {
      console.log("course",course);
      this.courses.push(course);
      swal(
        'Success!',
        'The record is added',
        'success'
      )
    });
  }

}
