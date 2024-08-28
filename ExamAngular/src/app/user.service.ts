// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { HttpHeaders } from '@angular/common/http';
import { UserDel } from './user-del';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7106/'; // URL de tu API

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}List`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}Save`, user);
  }
  
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}Delete?UsuarioId=${id}`);
  }

  getUserById(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}UserId?Id=${id}`);
  }
  

  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}Update`, user);
  }
  
  login(credentials: { Login: string; Password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}Login`, credentials);
  }

  
  
}
