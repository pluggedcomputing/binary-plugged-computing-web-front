import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private readonly API = 'api/question';

  constructor(private httpClient: HttpClient) { }

  


}
