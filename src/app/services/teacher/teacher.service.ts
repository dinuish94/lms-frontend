import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

@Injectable()
export class TeacherService {

  constructor(private _http: Http) { }

  getAll() {
    return this._http.get('http://localhost:8080/teachers').map(res => res.json());
  }

  add(teacher) {
    return this._http.post('http://localhost:8080/teachers',teacher).map(res => res.json());
  }

}
