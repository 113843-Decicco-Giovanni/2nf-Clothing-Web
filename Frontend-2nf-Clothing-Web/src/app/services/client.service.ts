import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/clients/client';
import { Observable } from 'rxjs';
import { ClientRequest } from '../models/clients/clientRequest';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = 'http://localhost:5260/api/clients'

  constructor(private http: HttpClient) { }

  create(client : ClientRequest): Observable<Client> {
    return this.http.post<Client>(this.url, client)
  }
  login(email: string, password: string): Observable<Client> {
    return this.http.post<Client>(this.url + '/login', { email, password })
  }
  update(id: number, client: ClientRequest): Observable<Client> {
    return this.http.put<Client>(this.url + '/' + id, client)
  }
  get(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url)
  }
}
