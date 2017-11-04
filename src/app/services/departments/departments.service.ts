import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DepartmentsService {

  constructor(private _http: Http) { }

  getAll() {
    return this._http.get('http://localhost:8080/departments').map(res => res.json());
  }

  addDepartment(newDepartment) {
    return this._http.post('http://localhost:8080/departments',newDepartment).map(res => res.json());
  }

}
