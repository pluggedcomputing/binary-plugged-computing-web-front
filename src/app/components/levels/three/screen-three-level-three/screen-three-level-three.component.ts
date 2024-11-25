import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../toast.service';
import { Question } from 'src/app/models/question.model';
import { QuestionsService } from 'src/app/service/question/questions.service';
import { SessionStorageService } from 'src/app/service/session-storage/session-storage-service.service';

@Component({
  selector: 'app-screen-three-level-three',
  templateUrl: './screen-three-level-three.component.html',
  styleUrls: ['./screen-three-level-three.component.css']
})
export class ScreenThreeLevelThreeComponent implements OnInit {

  btnClass1: string = "";
  imageRef: number | undefined;
  attempts: number = 0;

  idUser: string = this.sessionStorageService.getItem('userID') || 'Default Data';
  idApp: string = "WEB-BINARIOS 1.0";
  phaseActivity: string = "3";
  numberActivity: string = "1";
  typeOfQuestion: string = "ABERTA";
  expectedResponse: string = "9";
  dateResponse: Date;

  question: string = "Ao invés de 1 e 0, poderíamos usar outros códigos para representar cartões virados ou não. Considerando isso, que valor decimal representariam esses códigos? Tente lembrar a quantidade de pontos em cada cartão para fazer essa conversão.";
  answer: any;

  constructor(
    private router: Router, 
    public toastService: ToastService,
    private fb: FormBuilder,
    private questionsService: QuestionsService, 
    private sessionStorageService: SessionStorageService
     ) {
      this.dateResponse = new Date();
  }

  ngOnInit(): void {
    this.createForm();
    this.imageRef = 1;
  }

  createForm() {
    this.answer = this.fb.group({
      text: ['', [Validators.required]]
    });
  }

  processQuestionResponse(userResponse: string, isCorrect: boolean): void {
    const question: Question = new Question(this.idUser, this.idApp, this.phaseActivity, this.numberActivity, userResponse, this.expectedResponse, isCorrect, this.dateResponse, this.typeOfQuestion);
    this.questionsService.saveResponseQuestion(question).subscribe(
      response => {
        console.log("Question saved successfully:", response);
      },
      error => {
        console.error("Error saving question:", error);
      }
    );
  }

  changeAnswers(value: string): void {
    if (value === this.expectedResponse && this.imageRef === 1) {
      this.buttonClass(true);
      this.toastService.show('Parabéns!', 'success');  
      setTimeout(() => {
        this.toastService.clear(); 
        this.question = "Que número decimal está sendo representado por esses códigos?";
        this.processQuestionResponse(value, true);
        this.createForm();
        this.imageRef = 2;
        this.numberActivity = "2";
        this.expectedResponse = "10";
      }, 1000);

    } else if (value === this.expectedResponse && this.imageRef === 2) {
      this.buttonClass(true);
      this.toastService.show('Parabéns!', 'success');  
      setTimeout(() => {
        this.toastService.clear();
        this.createForm();
        this.imageRef = 3;
        this.processQuestionResponse(value, true);
        this.numberActivity = "3";
        this.expectedResponse = "5";
      }, 1000);

    } else if (value === this.expectedResponse && this.imageRef === 3) {
      this.buttonClass(true);
      this.toastService.show('Parabéns!', 'success');  
      setTimeout(() => {
        this.toastService.clear();
        this.createForm();
        this.imageRef = 4;
        this.processQuestionResponse(value, true);
        this.numberActivity = "4";
        this.expectedResponse = "11";
      }, 1000);

    } else if (value === this.expectedResponse && this.imageRef === 4) {
      this.buttonClass(true);
      this.toastService.show('Parabéns!', 'success');  
      setTimeout(() => {
        this.toastService.clear();
        this.createForm();
        this.imageRef = 5;
        this.processQuestionResponse(value, true);
        this.numberActivity = "5";
        this.expectedResponse = "0";
      }, 1000);

    } else if (value === this.expectedResponse && this.imageRef === 5) {
      this.buttonClass(true);
      this.toastService.show('Parabéns!', 'success');  
      setTimeout(() => {
        this.toastService.clear();
        this.createForm();
        this.imageRef = 6;
        this.processQuestionResponse(value, true);
        this.numberActivity = "6";
        this.expectedResponse = "17";
      }, 1000);

    } else if (value === this.expectedResponse && this.imageRef === 6) {
      this.buttonClass(true);
      this.toastService.show('Parabéns!', 'success');  
      setTimeout(() => {
        this.toastService.clear();
        this.createForm();
        this.imageRef = 7;
        this.processQuestionResponse(value, true);
        this.numberActivity = "7";
        this.expectedResponse = "2";
      }, 1000);

    } else if (value === this.expectedResponse && this.imageRef === 7) {
      this.buttonClass(true);
      this.toastService.show('Parabéns!', 'success');  
      setTimeout(() => {
        this.toastService.clear();
        this.createForm();
        this.imageRef = 8;
        this.processQuestionResponse(value, true);
        this.numberActivity = "8";
        this.expectedResponse = "0";
      }, 1000);

    } else if (value === this.expectedResponse && this.imageRef === 8) {
      this.buttonClass(true);
      this.toastService.show('Parabéns!', 'success');  
      setTimeout(() => {
        this.toastService.clear();
        this.createForm();
        this.imageRef = 9;
        this.processQuestionResponse(value, true);
        this.numberActivity = "9";
        this.expectedResponse = "20";
      }, 1000);

    } else if (value === this.expectedResponse && this.imageRef === 9) {
      this.buttonClass(true);
      this.toastService.show('Parabéns!', 'success');  
      setTimeout(() => {
        this.toastService.clear();
        this.createForm();
        this.imageRef = 10;
        this.processQuestionResponse(value, true);
        this.numberActivity = "10";
        this.expectedResponse = "31";
      }, 1000);

    } else if (value === this.expectedResponse && this.imageRef === 10) {
      this.buttonClass(true);
      this.toastService.show('Parabéns!', 'success');  
      setTimeout(() => {
        this.toastService.clear();
        this.router.navigate(['fase-3-4']);
      }, 1000);

    } else {
      this.buttonClass(false);
      this.toastService.show('Tente outra vez.', 'error');  
      this.attempts += 1;
      this.processQuestionResponse(value, false);
    }
  }

  buttonClass(status: boolean): void {
    this.btnClass1 = status ? "correct" : "incorrect";
    setTimeout(() => { this.btnClass1 = ""; }, 1000);
  }

}
