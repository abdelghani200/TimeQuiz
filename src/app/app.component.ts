import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngrx';

  showHome: boolean = false;
  isLogged: boolean = localStorage.getItem('isLogged') === 'true';

  constructor(private authService: AuthService, private cdRef: ChangeDetectorRef, private router: Router) {
    this.authService.loginSuccess.subscribe(() => {
      this.isLogged = true;
      this.cdRef.detectChanges();
    });
  }

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('isLogged') === 'true';
    if (this.authService.isTeacher()) {
      this.router.navigate(['/statistics']);
    }
  }

  onLoginSuccess(token: string): void {
    this.isLogged = true;
    localStorage.setItem('isLogged', 'true');
  }


  onLogout(): void {
    this.isLogged = false;
    localStorage.setItem('isLogged', 'false');
  }

}
