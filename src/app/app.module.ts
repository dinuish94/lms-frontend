import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { DatepickerModule } from 'angular2-material-datepicker';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HomeComponent } from './home/home.component';

import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';

import { TeacherCourseComponent } from './teacher-course/teacher-course.component';
import { TeacherQuizComponent } from './teacher-quiz/teacher-quiz.component';
import { EditQuestionModalComponent } from './edit-question-modal/edit-question-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { StudentComponent } from './student/student.component';
import { StudentFeedbackComponent } from './student-feedback/student-feedback.component';
import { StudentEnrolledCoursesComponent } from './student-enrolled-courses/student-enrolled-courses.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { LoginComponent } from './login/login.component';
import { StudentQuizComponent } from './student-quiz/student-quiz.component';
import { TeacherAssignmentsComponent } from './teacher-assignments/teacher-assignments.component';
import { QuizPanelComponent } from './student-quiz/quiz-panel/quiz-panel.component';

import { QuizService } from './services/quiz/quiz.service';
import { CourseService } from './services/course/course.service';
import { StudentService } from './services/student/student.service';
import { MarkQuizService } from './services/mark-quiz/mark-quiz.service';

import { AppTimePipe } from './pipes/appTimePipe/app-time.pipe';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    IconsComponent,
    NotificationsComponent,
    HomeComponent,

    TeacherDashboardComponent,

    //MyNewComponentComponent,
    TeacherCourseComponent,
    TeacherQuizComponent,
   // QuizQuestionsComponent,

    TeacherCourseComponent,
    TeacherQuizComponent,
    EditQuestionModalComponent,


    StudentComponent,
    StudentFeedbackComponent,
    StudentEnrolledCoursesComponent,
    StudentCoursesComponent,
    StudentHomeComponent,
    LoginComponent,
    StudentQuizComponent,
    TeacherAssignmentsComponent,
    QuizPanelComponent,
    AppTimePipe,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    DatepickerModule,
    HttpClientModule
  ],
  providers: [
    QuizService,
    CourseService,
    StudentService,
    MarkQuizService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
