import { Component, OnInit, OnChanges } from '@angular/core';
import { StudentService } from '../services/student/student.service';
import {ActivatedRoute} from '@angular/router';

import { Student } from '../models/student.model';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnChanges, OnInit {
  isEditName: boolean = false;
  isEditEmail: boolean = false;
  name: string = '';
  student: any = new Array();
  studentId: number;
  editStudent: Student = new Student();

  constructor(private _studentService: StudentService, private _route:ActivatedRoute) { 
    this.studentId = this._route.snapshot.params['userId'];    
    this.getStudent();
  }

  ngOnChanges(changes) {
    this.name = 'kashif roshen';
  }

  ngOnInit() {
    this.name = 'kashif roshen';
  }

  editName() {
    this.editStudent.name = this.student.name;
    this.updateStudent();
  }


  editEmail() {
    this.editStudent.email = this.student.email;
    this.updateStudent();
  }

  clickEditName() {
    this.isEditName = true;
  }

  clickEditEmail() {
    this.isEditEmail = true;
  }

  getStudent() {
    this._studentService.getStudent(this.studentId).subscribe(student => {
      this.student = student;
      this.student.email = 'kashifroshen7@gmail.com';
    });
  }

  updateStudent() {
    this._studentService.updateStudent(this.studentId,this.editStudent).subscribe(student => {
      this.student = student;
      this.updateStudent = null;
      this.togglePencil();

    });
  }

  private togglePencil() {
    if (this.isEditName === true) {
      this.isEditName = false;
    } else {
      this.isEditEmail = false;
    }
  }

  private getQuiz() {
    
  }
}
