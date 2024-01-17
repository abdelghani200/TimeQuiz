import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = { email: '', password: '' };
  @Output() loginSuccess = new EventEmitter<string>();
  showHome: boolean = false;
  isLoggin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.credentials).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.authService.setUserRole(response.role);
        this.authService.emitLoginSuccess(response.token);
        console.log(response.token);

        this.showHome = response.role === 'TEACHER';
        this.isLoggin = true;
        localStorage.setItem('isLogged', this.isLoggin.toString());
        this.router.navigate(['/statistics'])
      },
      error => {
      }
    );
  }

  onLoginSuccess(token: string): void {
    this.isLoggin = true;
    localStorage.setItem('isLogged', this.isLoggin.toString());
    this.authService.emitLoginSuccess(token);
  }

}
