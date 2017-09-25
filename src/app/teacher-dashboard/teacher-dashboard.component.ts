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

  constructor(private _teacherService: TeacherService) { }

  ngOnInit() {
    this._teacherService.getAllCourses().subscribe(courses => {this.courses = courses;
      console.log(courses);
    });
  }
  

}
