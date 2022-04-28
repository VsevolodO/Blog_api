import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate, CanActivateChild{
    constructor(private auth: AuthService, private router:Router) {
    }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.auth.isAuthenticated()) {
          return of(true)
        } else {
          this.router.navigate(['/login'], {
            queryParams: {
              accessDenied: true
            }
          })
          return of(false)
        }
      }
    
      canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(route, state)
      }
    }