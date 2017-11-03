import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnChanges, OnInit {
  isEditName: boolean = false;
  isEditEmail: boolean = false;
  name: string = '';
  student: any;
  constructor() { 
    this.student = {
      name: 'Kashif Roshen',
      email: 'kashifroshen7@gmail.com',
      courses: [
        'Software Technology',
        'Software Engineering'
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

  editName() {
    this.isEditName = true;
  }


  editEmail() {
    this.isEditEmail = true;
  }

  clickEditName() {
    this.isEditName = true;
  }

  clickEditEmail() {
    this.isEditEmail = true;
  }
}
