import { Component, OnInit } from '@angular/core';

import { DepartmentsService } from '../services/departments/departments.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-department',
  templateUrl: './admin-department.component.html',
  styleUrls: ['./admin-department.component.css']
})
export class AdminDepartmentComponent implements OnInit {

  departments: any = new Array();
  department: any = {
    name: '',
    description: '',
    courses: new Array(),
    teachers: new Array(),
    students: new Array()
  };

  constructor(private _departmentService: DepartmentsService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this._departmentService.getAll().subscribe(departments => {
      this.departments = departments;
    });
  }

  addDepartment() {
    this._departmentService.addDepartment(this.department).subscribe(department => {
      swal(
        'Success!',
        'The record is added',
        'success'
      )
      this.departments.push(department);
    });
  }

}
