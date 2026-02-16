import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User, AuthResponse } from '../models';
import { environment } from '../utils/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    isPlatformBrowser(this.platformId) && !!localStorage.getItem('auth_token')
  );
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private api: ApiService) {
    this.checkCurrentUser();
  }

  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.api
        .post<AuthResponse>(environment.apiEndpoints.auth.login, { email, password })
        .then((response) => {
          this.api.setToken(response.data.token);
          this.currentUserSubject.next(response.data.user);
          this.isAuthenticatedSubject.next(true);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  register(
    name: string,
    email: string,
    phone: string,
    password: string,
    passwordConfirmation: string
  ): Observable<any> {
    return new Observable((observer) => {
      this.api
        .post<AuthResponse>(environment.apiEndpoints.auth.register, {
          name,
          email,
          phone,
          password,
          password_confirmation: passwordConfirmation,
        })
        .then((response) => {
          this.api.setToken(response.data.token);
          this.currentUserSubject.next(response.data.user);
          this.isAuthenticatedSubject.next(true);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  logout(): Observable<any> {
    return new Observable((observer) => {
      this.api
        .post(environment.apiEndpoints.auth.logout, {})
        .then(() => {
          this.api.clearToken();
          this.currentUserSubject.next(null);
          this.isAuthenticatedSubject.next(false);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('user');
          }
          observer.next(null);
          observer.complete();
        })
        .catch((error) => {
          // Clear locally even if API fails
          this.api.clearToken();
          this.currentUserSubject.next(null);
          this.isAuthenticatedSubject.next(false);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('user');
          }
          observer.error(error);
        });
    });
  }

  checkCurrentUser(): void {
    if (this.api.isAuthenticated()) {
      this.api
        .get<User>(environment.apiEndpoints.auth.me)
        .then((response) => {
          this.currentUserSubject.next(response.data);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
        })
        .catch(() => {
          this.api.clearToken();
          this.currentUserSubject.next(null);
          this.isAuthenticatedSubject.next(false);
        });
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  private getUserFromStorage(): User | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
