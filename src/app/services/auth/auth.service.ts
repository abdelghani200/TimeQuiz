import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/shared/config/API';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper: JwtHelperService = new JwtHelperService();

  loginSuccess = new EventEmitter<string>();

  private userRole: string | null = null;

  constructor(private http: HttpClient) { }

  setUserRole(role: string): void {
    this.userRole = role;
  }

  getRole(): string | null {
    return this.userRole;
  }

  login(credentials: {email: String, password: String}): Observable<any> {
    return this.http.post(API_URLS.Login_URL, credentials);
  }

  getIsLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  emitLoginSuccess(token: string): void {
    this.loginSuccess.emit(token);
  }


  hasPermission(): boolean {
    
    return true;
  }

  isTeacher(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken && decodedToken.role === 'TEACHER';
    }
    return false;
  }

  isStudent(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken && decodedToken.role === 'STUDENT';
    }
    return false;
  }

}
