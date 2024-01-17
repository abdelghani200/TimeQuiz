import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentAuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(): boolean {
    const role = localStorage.getItem('role')

    if(role && role === 'STUDENT'){
      return true;
    } else{
      this.router.navigate(['/login'])
      return false;
    }

  }

}
