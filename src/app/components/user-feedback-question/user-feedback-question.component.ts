import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-feedback-question',
  templateUrl: './user-feedback-question.component.html',
  styleUrls: ['./user-feedback-question.component.css']
})
export class UserFeedbackQuestionComponent implements OnInit {
  quantityOfCorrectQuestions: number = 0;

  constructor() { 


  }

  ngOnInit(): void {
  }

}
