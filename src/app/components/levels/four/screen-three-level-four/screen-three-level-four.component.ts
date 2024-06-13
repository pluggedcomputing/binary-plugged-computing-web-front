import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../toast.service';
import { Question } from 'src/app/models/question.model';
import { QuestionsService } from 'src/app/service/question/questions.service';
import { SessionStorageService } from 'src/app/service/session-storage/session-storage-service.service';

@Component({
  selector: 'app-screen-three-level-four',
  templateUrl: './screen-three-level-four.component.html',
  styleUrls: ['./screen-three-level-four.component.css']
})
export class ScreenThreeLevelFourComponent implements OnInit {

  btnClass1: string = "";

  imageRef: number | undefined;

  attempts: number = 0;
  ////
  idUser: string = this.sessionStorageService.getItem('userID') || 'Default Data';
  idApp: string = "WEB-BINARIOS 1.0"
  phaseActivity: string = "4"
  numberActivity: string = "1";
  typeOfQuestion: string = "ABERTA"
  expectedResponse: string = "1"
  dateResponse: Date;
  ////
  question: string = "Você pode identificar a mensagem enviada por Tom? Lembre-se de converter a combinação binária para decimal e fique atento pois as luzes apagadas representam o bit 0 e as luzes acesas representam o bit 1. Qual o decimal correspondente a esta configuração de lâmpadas?";

  answer: any;

  constructor(private router: Router, 
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
    const question: Question = new Question(this.idUser,this.idApp,this.phaseActivity,this.numberActivity,userResponse,this.expectedResponse,isCorrect,this.dateResponse,this.typeOfQuestion);
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
    if(value === this.expectedResponse && this.imageRef === 1) {
        this.buttonClass(true);
        setTimeout(() => {
          this.question = "Qual o número decimal correspondente a esta configuração de lâmpadas?";
          this.createForm();
          this.imageRef = 2;
          this.processQuestionResponse(value,true);
          this.expectedResponse = "10";
          this.numberActivity = "2";
        },1000);
    } else if(value === this.expectedResponse && this.imageRef === 2) {
        this.buttonClass(true);
        setTimeout(() => {
          this.createForm();
          this.imageRef = 3;
          this.processQuestionResponse(value,true);
          this.expectedResponse = "21";
          this.numberActivity = "3";
        },1000);
    } else if(value === this.expectedResponse && this.imageRef === 3) {
        this.buttonClass(true);
        setTimeout(() => {
          this.createForm();
          this.imageRef = 4;
          this.processQuestionResponse(value,true);
          this.expectedResponse = "4";
          this.numberActivity = "4";
        },1000);
    } else if(value === this.expectedResponse && this.imageRef === 4) {
        this.buttonClass(true);
        setTimeout(() => {
          this.createForm();
          this.imageRef = 5;
          this.processQuestionResponse(value,true);
          this.expectedResponse = "5";
          this.numberActivity = "5";
        },1000);
    } else if(value === this.expectedResponse && this.imageRef === 5) {
        this.buttonClass(true);
        setTimeout(() => {
          this.createForm();
          this.imageRef = 6;
          this.processQuestionResponse(value,true);
          this.expectedResponse = "5";
          this.numberActivity = "6";
        },1000);
    } else if(value === this.expectedResponse && this.imageRef === 6) {
        this.buttonClass(true);
        setTimeout(() => {
          this.createForm();
          this.imageRef = 7;
          this.processQuestionResponse(value,true);
          this.expectedResponse = "19";
          this.numberActivity = "7";
        },1000);
    } else if(value === this.expectedResponse && this.imageRef === 7) {
        this.buttonClass(true);
        setTimeout(() => {
          this.createForm();
          this.imageRef = 8;
          this.processQuestionResponse(value,true);
          this.expectedResponse = "20";
          this.numberActivity = "8";
        },1000);
    } else if(value === this.expectedResponse && this.imageRef === 8) {
        this.buttonClass(true);
        setTimeout(() => {
          this.createForm();
          this.imageRef = 9;
          this.processQuestionResponse(value,true);
          this.expectedResponse = "15";
          this.numberActivity = "9";
        },1000);
    } else if(value === this.expectedResponse && this.imageRef === 9) {
        this.buttonClass(true);
        setTimeout(() => {
          this.createForm();
          this.imageRef = 10;
          this.processQuestionResponse(value,true);
          this.expectedResponse = "21";
          this.numberActivity = "10";
        },1000);
    } else if(value === this.expectedResponse && this.imageRef === 10) {
        this.buttonClass(true);
        setTimeout(() => {
          this.createForm();
          this.imageRef = 11;
          this.processQuestionResponse(value,true);
          this.expectedResponse = "16";
          this.numberActivity = "11";
        },1000);
    } else if(value === this.expectedResponse && this.imageRef === 11) {
        this.buttonClass(true);
        setTimeout(() => {
          this.createForm();
          this.imageRef = 12;
          this.processQuestionResponse(value,true);
          this.expectedResponse = "18";
          this.numberActivity = "12";
        },1000);
    } else if(value === this.expectedResponse && this.imageRef === 12) {
        this.buttonClass(true);
        setTimeout(() => {
          this.createForm();
          this.imageRef = 13;
          this.processQuestionResponse(value,true);
          this.expectedResponse = "5";
          this.numberActivity = "13";
        },1000);
    } else if(value === this.expectedResponse && this.imageRef === 13) {
        this.buttonClass(true);
        setTimeout(() => {
          this.createForm();
          this.imageRef = 14;
          this.processQuestionResponse(value,true);
          this.expectedResponse = "19";
          this.numberActivity = "14";
        },1000);
    } else if(value === this.expectedResponse && this.imageRef === 14) {
        this.buttonClass(true);
        setTimeout(() => {
          this.createForm();
          this.imageRef = 15;
          this.processQuestionResponse(value,true);
          this.expectedResponse = "15";
          this.numberActivity = "15";
        },1000);
    } else if(value === this.expectedResponse && this.imageRef === 15) {
        this.buttonClass(true);
        setTimeout(() => {
          this.question = "Esses foram os números que você selecionou: 1 10 21 4 5 &nbsp;&nbsp; 5 19 20 15 21 &nbsp;&nbsp; 16 18 5 19 15. Agora vamos traduzir a mensagem do Tom?";
          this.createForm();
          this.imageRef = 16;
          this.processQuestionResponse(value,true);
          this.expectedResponse = "ajude estou preso";
          this.numberActivity = "16";
        },1000);
    } else if(value.toLowerCase() === this.expectedResponse && this.imageRef === 16) {
        this.buttonClass(true);
        setTimeout(() => {
          this.processQuestionResponse(value,true);
          this.router.navigate(['fase-4-4']);
        },1000);
    } else {
      this.buttonClass(false);
      this.toastService.show('Tente outra vez.');
      this.attempts += 1;
      console.log(this.attempts);
      this.processQuestionResponse(value,false);
    }
  }

  buttonClass(status: boolean): void {
    this.btnClass1 = status ? "correct" : "incorrect";
    setTimeout(() => {this.btnClass1 = "";},1000);
  }

}
