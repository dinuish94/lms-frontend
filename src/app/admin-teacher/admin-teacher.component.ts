import { Component, OnInit } from '@angular/core';

import { TeacherService } from '../services/teacher/teacher.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-teacher',
  templateUrl: './admin-teacher.component.html',
  styleUrls: ['./admin-teacher.component.css']
})
export class AdminTeacherComponent implements OnInit {
  teachers:any = new Array();
  newTeacher:any = new Object();

  constructor(private _teacherService: TeacherService) { 
    this.getTeachers();
  }

  ngOnInit() {
  }

  getTeachers() {
    this._teacherService.getAll().subscribe(teachers => {
      this.teachers = teachers;
      console.log(teachers);
    });
  }

  addTeacher() {
    console.log(this.newTeacher,"fegfe");
    this._teacherService.add(this.newTeacher).subscribe(teacher => {
      console.log(teacher);
      this.teachers.push(teacher);
      swal(
        'Success!',
        'The record is added',
        'success'
      )
    });
  }

}
