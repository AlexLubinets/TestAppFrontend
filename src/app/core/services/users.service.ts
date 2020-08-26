import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseURL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  readonly UsersApiURL = '/Users';

  getUsers() {
    return this.http.get<any>(`${BaseURL}${this.UsersApiURL}/List`, {observe:'response'});
  }
}
