import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private readonly API = 'api/question';

  constructor(private httpClient: HttpClient) { }

  saveResponseQuestion(question: Question){
      return this.httpClient.post<Question>(this.API,question);
  }


}
