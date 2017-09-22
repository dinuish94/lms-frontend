import { Injectable } from '@angular/core';
import  { Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    //pass auth service here
    constructor(private Router: Router){}

    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
       /* if authenticated */
            this.Router.navigate(['/dashboard']);
            return true;
      /* else */  
        //this.Router.navigate(['/login']);
        //return false;
    }
}