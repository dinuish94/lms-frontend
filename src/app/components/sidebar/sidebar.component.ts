import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export let ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
    { path: 'user', title: 'Users', icon: 'person', class: '' },
    { path: 'table-list', title: 'Table List', icon: 'content_paste', class: '' },
    { path: 'typography', title: 'Typography', icon: 'library_books', class: '' },
    { path: 'icons', title: 'Icons', icon: 'bubble_chart', class: '' },
    { path: 'maps', title: 'Maps', icon: 'location_on', class: '' },
    { path: 'notifications', title: 'Notifications', icon: 'notifications', class: '' },
    { path: 'teacher-dashboard', title: 'Teacher Dashboard', icon: 'dashboard', class: '' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    permissions: any[];

    constructor(private http: Http) { }

    ngOnInit() {
        let role = 2;
        this.getJSON().subscribe(data => {
             this.permissions=data;
             this.permissions.forEach(permission => {
                 if (role === permission.id) {
                     ROUTES = permission.permissions;
                 }
             });
             this.menuItems = ROUTES.filter(menuItem => menuItem);
            }, error => console.log(error));
        
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    public getJSON(): Observable<any> {
        return this.http.get("/assets/json/permission.json")
            .map((res: any) => res.json());

    }
}
