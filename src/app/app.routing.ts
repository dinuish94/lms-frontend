import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HomeComponent } from './home/home.component';

import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherCourseComponent } from './teacher-course/teacher-course.component';
import { TeacherQuizComponent } from './teacher-quiz/teacher-quiz.component';


import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentEnrolledCoursesComponent } from './student-enrolled-courses/student-enrolled-courses.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentFeedbackComponent } from './student-feedback/student-feedback.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent /*,canActivate:[AuthGuard]*/ },
  { path: 'dashboard', component: DashboardComponent /*,canActivate:[AuthGuard]*/ },
  { path: 'user', component: UserProfileComponent /*,canActivate:[AuthGuard]*/ },
  { path: 'table-list', component: TableListComponent /*,canActivate:[AuthGuard]*/ },
  { path: 'icons', component: IconsComponent /*,canActivate:[AuthGuard]*/ },
  { path: 'notifications', component: NotificationsComponent /*,canActivate:[AuthGuard]*/ },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'teacher-dashboard', component: TeacherDashboardComponent },
  { path: 'courses/:id', component: TeacherCourseComponent },
  { path: 'courses/:cId/quiz/:qId', component: TeacherQuizComponent },
  { path: 'student-home', component: StudentHomeComponent /*,canActivate:[AuthGuard]*/},
  { path: 'student-enrolled-courses', component: StudentEnrolledCoursesComponent /*,canActivate:[AuthGuard]*/},
  { path: 'student-courses', component: StudentCoursesComponent /*,canActivate:[AuthGuard]*/},
  { path: 'student-feedback', component: StudentFeedbackComponent /*,canActivate:[AuthGuard]*/},
  { path: 'login', component: LoginComponent /*,canActivate:[AuthGuard]*/},
]



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
