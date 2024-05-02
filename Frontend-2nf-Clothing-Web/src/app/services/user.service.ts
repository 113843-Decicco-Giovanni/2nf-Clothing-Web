import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/users/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:5260/api/users'
  constructor(private http: HttpClient) { }

  loginRequest(userName: string, password: string): Observable<User> {
    return this.http.post<Readonly<User>>(this.url + '/login', { userName, password })
  }
  getUsers(adminId: number): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/' + adminId)
  }
  newUser(adminId: number, userName: string, email: string, password: string): Observable<User> {
    return this.http.post<Readonly<User>>(this.url + '/' + adminId, {userName, email, password})
  }
  updateUser(userId: number, userName: string, email: string, password: string, newPassword?: string): Observable<User> {
    return this.http.put<Readonly<User>>(this.url + '/' + userId, {userName, email, password, newPassword})
  }
  changeActive(adminId: number, userId: number): Observable<User> {
    return this.http.put<Readonly<User>>(this.url + '/' + adminId + '/' + userId, {})
  }
  changeAdmin(adminId: number, userId: number): Observable<User> {
    return this.http.put<Readonly<User>>(this.url + '/admin/' + adminId + '/' + userId, {})
  }
}
