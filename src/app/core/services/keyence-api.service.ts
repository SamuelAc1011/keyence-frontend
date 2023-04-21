import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap,} from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class KeyenceApiService {
  private _baseUrl = 'http://52.201.245.105';
  private _token: string | undefined;
  // private _token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDFiMjFiYmVkZDg0NGY0YmVkMTQyNCIsImlhdCI6MTY4MjA0MDc4NSwiZXhwIjoxNjgyMTI3MTg1fQ.8qZERyGEfq8teH9Zg-TDXQhnnpKS7W-RAPA74k49Dpw';

  constructor(private http: HttpClient) { }

  logIn(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this._baseUrl}/auth/logIn`, body)
      .pipe(
        tap(response => {
          this._token = response.token;
          console.log('Token:', this._token);
        })
      );
  }



  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this._token}`);
    return this.http.get<User[]>(`${this._baseUrl}/user`, { headers });
  }

  deleteUser(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this._token}`);
    console.log('id:', id)
    return this.http.delete<any>(`${this._baseUrl}/user/${id}`, { headers });
  }

  createUser(user: User): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this._token}`);
    return this.http.post<User>(`${this._baseUrl}/user`, user, { headers });
  }

}
