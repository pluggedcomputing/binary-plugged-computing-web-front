import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EmailInputService {

  email: string = "";
  private readonly API = 'http://api.observatorioturismopb.com.br:8383/api/user';

  constructor(private httpClient: HttpClient) { }
  
 

  saveUser(user: User) {
    return this.httpClient.post<User>(this.API, user);
  }

  
}
