import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student/student.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css'],
  providers : [StudentService]
})
export class StudentHomeComponent implements OnInit {

  students : Student[];

  constructor(private studentService:StudentService) { 
    studentService.getStudents().subscribe(students=>{
      console.log(students);
    });

    localStorage.setItem('studentId', '1');
  }

  ngOnInit() {
  }

  

}

interface Student{
  id : number;
  title : string;
  body : string;
}