import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../utils/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api: AxiosInstance;
  private platformId = inject(PLATFORM_ID);

  constructor() {
    this.api = axios.create({
      baseURL: environment.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Add Authorization header if token exists
    this.api.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle response errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearToken();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('auth_token', token);
    }
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem('auth_token');
  }

  clearToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  get<T>(url: string, config?: any) {
    return this.api.get<T>(url, config);
  }

  post<T>(url: string, data: any, config?: any) {
    return this.api.post<T>(url, data, config);
  }

  put<T>(url: string, data: any, config?: any) {
    return this.api.put<T>(url, data, config);
  }

  delete<T>(url: string, config?: any) {
    return this.api.delete<T>(url, config);
  }
}
