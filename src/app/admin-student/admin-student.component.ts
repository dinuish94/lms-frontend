import { Component, OnInit } from '@angular/core';

import { StudentService } from '../services/student/student.service';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.css']
})
export class AdminStudentComponent implements OnInit {
  students: any;

  constructor(private _studentService: StudentService) { }

  ngOnInit() {
  }

  private getStudents() {
    this._studentService.getStudents().subscribe(students => {
      this.students = students;
      console.log("students are", this.students);
    });
  }
 
}
