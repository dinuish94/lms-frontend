import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { Quiz } from '../models/quiz.model';
import { AddedQuiz } from '../models/addedQuiz.model';
import { Assignment } from '../models/assignment.model';
import { TeacherQuizService } from '../teacher-quiz/teacher-quiz.service';
import { TeacherAssignmentsService } from '../teacher-assignments/teacher-assignments.service';

@Component({
  selector: 'app-teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css'],
  providers: [TeacherQuizService, TeacherAssignmentsService]
})
export class TeacherCourseComponent implements OnInit {
  
  cId: number;
  quiz: Quiz = new Quiz();
  quizzes: AddedQuiz[];
  assignment: Assignment = new Assignment();
  assignments: Assignment[];

  constructor(private _route:ActivatedRoute, private _teacherQuizService:TeacherQuizService, private _teacherAssignmentService: TeacherAssignmentsService, private _router:Router) { }

  ngOnInit() {
    this.cId = this._route.snapshot.params['id'];
    this.getAllQuizzes();
    this.getAllAssignments();
  }

  addNewQuiz () {
    this.quiz.course = this.cId;
    this._teacherQuizService.addNewQuiz(this.quiz).subscribe(quiz => {
      this._router.navigateByUrl('courses/'+this.cId+'/quiz/'+quiz.qId);
    });
  }

  getAllQuizzes(){
    this._teacherQuizService.getAllQuizzes(this.cId).subscribe(quizzes => {
      this.quizzes = quizzes;
    });
  }

  addNewAssignment() {
    this.assignment.courseId = this.cId;
    console.log(JSON.stringify(this.assignment));
    this._teacherAssignmentService.addNewAssignment(this.assignment).subscribe(assignment => {
      this.getAllAssignments();
      this.assignment.name = "";
      this.assignment.description = "";
      this.assignment.endDate = null;
      this.assignment.startDate = null;
    });
  }

  getAllAssignments(){
    this._teacherAssignmentService.getAllAssignments(this.cId).subscribe(assignments => {
      this.assignments = assignments;
    });
  }

}
