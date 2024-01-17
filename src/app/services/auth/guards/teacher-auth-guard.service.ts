import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class TeacherAuthGuard implements CanActivate {

  constructor(private authService: AuthService,private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree{
    if (this.authService.isTeacher()) {
      return true;
    } else {
      return this.router.createUrlTree(['/error']);
    }
  }
}