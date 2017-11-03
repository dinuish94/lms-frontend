import { Component, OnInit } from '@angular/core';

import { StudentService } from '../services/student/student.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.css']
})
export class AdminStudentComponent implements OnInit {
  students: any = new Array();
  newStudent: any = new Object();

  constructor(private _studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }

  private getStudents() {
    this._studentService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  private addStudent() {
    this._studentService.addStudent(this.newStudent).subscribe(response => {
      this.students.push(this.newStudent);
      swal(
        'Success!',
        'The record is added',
        'success'
      )
    });
  } 
 
}
