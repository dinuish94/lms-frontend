import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnChanges, OnInit {
  isEditName: boolean = false;
  name: string = '';
  student: any;
  constructor() { 
    this.student = {
      name: 'Kashif Roshen',
      email: 'kashifroshen7@gmail.com',
      courses: [
        'Software Technology',
        'Softwa'
      ]    
    }
  }

  // ngOnInit() {

  // }

  ngOnChanges(changes) {
    this.name = 'kashif roshen';
    console.log("changes");
  }

  ngOnInit() {
    console.log("name is online");
    this.name = 'kashif roshen';
  }

  toggle() {
    this.isEditName = !this.isEditName;
  }

}
