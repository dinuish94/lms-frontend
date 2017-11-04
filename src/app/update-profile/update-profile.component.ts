import { Component, OnInit, OnChanges } from '@angular/core';
import { StudentService } from '../services/student/student.service';
import { QuizService } from '../services/quiz/quiz.service';
import {ActivatedRoute} from '@angular/router';

import { Student } from '../models/student.model';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  isEditName: boolean = false;
  isEditEmail: boolean = false;
  name: string = '';
  student: any = {
    courses: new Array()
  };
  studentId: number;
  editStudent: Student = new Student();
  quizzes: any = new Array();

  constructor(private _studentService: StudentService, private _route:ActivatedRoute, private _quizService: QuizService) { 
  }


  editName() {
    this.editStudent.name = this.student.name;
    this.updateStudent();
  }

  ngOnInit() {
    this.studentId = this._route.snapshot.params['userId'];    
    this.getStudent();
    this.getQuizMarks();
    this.mapCourses();
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
      console.log(student);
      this.student = student;
      this.student.email = 'kashifroshen7@gmail.com';
      this.mapCourses();
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

  private getQuizMarks() {
   this._studentService.getStudentMarks(this.studentId).subscribe(studentMarks => {
     console.log(studentMarks,"ge");
      this.mapQuizzes(studentMarks);
   });
  }

  private mapCourses() {
    this.student.courses.forEach(course => {
      let i = 0;
      this.student.courses[i] = course.name;
      i++;
    });
  }

  private mapQuizzes(studentMarks: any) {
    let quiz: any = {
      course:'',
      quiz:'',
      mark:0
    };
    studentMarks.forEach(studentMark => {
      console.log(studentMark.marks);
      quiz.course = studentMark.quiz.course.name;
      quiz.quiz = studentMark.quiz.name;
      quiz.mark = studentMark.marks;
      console.log(quiz);

      this.quizzes.push(quiz);
    });
  }
}
