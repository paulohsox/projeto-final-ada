import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { TokenPayload } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  private _token = signal<string | null>(null);
  public token = this._token.asReadonly();

  public isUserLoggedIn = computed(() => {
    const token = this._token();
    if (!token) return false;
    return token;
  });

  private _sub = signal<number | null>(null);
  public sub = this._sub.asReadonly();

  private _user = signal<string | null>(null);
  public user = this._user.asReadonly();

  constructor() {
    this.getToken();
  }

  public login(
    username: string,
    password: string
  ): Observable<{ token: string }> {
    return this.httpClient
      .post<{ token: string }>(`${this.baseUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          this.setToken(res.token);
        })
      );
  }

  public logout() {
    localStorage.removeItem('token');
    this._token.set(null);
    this._sub.set(null);
    this._user.set(null);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    const payload = jwtDecode<TokenPayload>(token);
    this._token.set(token);
    this._sub.set(payload.sub);
    this._user.set(payload.user);
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = jwtDecode<TokenPayload>(token);
        this._token.set(token);
        this._sub.set(payload.sub);
        this._user.set(payload.user);
      } catch (error) {
        console.error('Error decoding token: ', error);
      }
    }
  }

  isUserAdmin(username: string | null) {
    if (username === 'johnd') return true;
    return false;
  }
}
