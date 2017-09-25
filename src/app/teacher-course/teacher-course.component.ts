import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css']
})
export class TeacherCourseComponent implements OnInit {
  
  cId: number;

  constructor(private _route:ActivatedRoute) { }

  ngOnInit() {
    this.cId = this._route.snapshot.params['id'];
    console.log(this.cId);
  }

}
