import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService, private router: Router) { }

  ngOnInit() {
  }

  login(username,password){
    let authObj = {"id":username, "password":password};

    this.loginService.authenticate(authObj).subscribe(user=>{
        if(user.id === null){
          swal(
            'Invalid Credentials!',
            'Username or Password is Incorrect',
            'error'
          )
        } else{
          localStorage.setItem("authUser",JSON.stringify(user));
          
          swal({
            title: 'Login Success!',
            text: 'Welcome '+user.role,
            type: 'success',
            confirmButtonText: 'OK',
          }).then(()=> {
              switch (user.role) {
                case 1:
                  this.router.navigate(['/student-home']);
                  break;
                case 2:
                  this.router.navigate(['/teacher-dashboard']);
                  break;
                case 3:
                  this.router.navigate(['/student-home']);
                  break;
                default:
                  this.router.navigate(['/home']);
              }
            });
          }
    });
  }

}
