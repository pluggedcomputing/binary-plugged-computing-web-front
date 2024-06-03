import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserInputService {

  private readonly API = 'https://activities.a4s.dev.br/api/user';
  
  userID: string = '';

  constructor(private httpClient: HttpClient) { }
  

  saveUser(user: User) {
    return this.httpClient.post<User>(this.API, user);
  }

  
}
  