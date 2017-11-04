import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student/student.service';
import { Http } from '@angular/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css'],
  providers : [StudentService]
})
export class StudentHomeComponent implements OnInit {

  students : Student[];

  constructor(private studentService:StudentService,private _route: Router) { }

  ngOnInit() {
    let userObj = localStorage.getItem("authUser");
    let user = JSON.parse(userObj);
  }

  test(){
    alert("remove");
    localStorage.removeItem("authUser");
  }

  goToProfile() {
    let student = JSON.parse(localStorage.getItem('authUser'));
    this._route.navigateByUrl('view-profile/' + student.id);
  }
}

interface Student{
  id : number;
  title : string;
  body : string;
}