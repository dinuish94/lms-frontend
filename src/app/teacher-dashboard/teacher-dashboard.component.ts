import { Component, OnInit } from '@angular/core';
import {TeacherService} from './teacher.service';
import {Course} from '../models/course.model';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
  providers: [TeacherService]
})
export class TeacherDashboardComponent implements OnInit {

  courses: Course[];
  teacherId : number;

  constructor(private _teacherService: TeacherService) { 
    let userObj = localStorage.getItem("authUser");
    let user = JSON.parse(userObj);
    this.teacherId = user.id;
    console.log("***"+this.teacherId);
  }

  ngOnInit() {
    this._teacherService.getAllCourses(this.teacherId).subscribe(courses => {
      this.courses = courses;
    });
  }

}
