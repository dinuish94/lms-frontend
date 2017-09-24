import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes =[
  { path: 'home',      component: HomeComponent /*,canActivate:[AuthGuard]*/},  
    { path: 'dashboard',      component: DashboardComponent /*,canActivate:[AuthGuard]*/},
    { path: 'user',   component: UserProfileComponent /*,canActivate:[AuthGuard]*/},
    { path: 'table-list',     component: TableListComponent /*,canActivate:[AuthGuard]*/},
    { path: 'icons',          component: IconsComponent /*,canActivate:[AuthGuard]*/},
    { path: 'notifications',  component: NotificationsComponent /*,canActivate:[AuthGuard]*/},
    { path: '',          redirectTo: 'home', pathMatch: 'full' }
];

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
