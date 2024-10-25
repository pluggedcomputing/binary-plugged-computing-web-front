import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../toast.service';
import { Question } from 'src/app/models/question.model';
import { QuestionsService } from 'src/app/service/question/questions.service';
import { SessionStorageService } from 'src/app/service/session-storage/session-storage-service.service';

@Component({
  selector: 'app-screen-two-level-seven',
  templateUrl: './screen-two-level-seven.component.html',
  styleUrls: ['./screen-two-level-seven.component.css']
})
export class ScreenTwoLevelSevenComponent implements OnInit {

  btnClass1: string = "";
  btnClass2: string = "";
  btnClass3: string = "";
  btnClass4: string = "";
  btnClass5: string = "";

  imageRef: number | undefined;
  attempts: number = 0;

  idUser: string = this.sessionStorageService.getItem('userID') || 'Default Data';
  idApp: string = "WEB-BINARIOS 1.0";
  phaseActivity: string = "6";
  numberActivity: string = "1";
  typeOfQuestion: string = "MULTIPLA ESCOLHA";
  expectedResponse: string = "O número é dobrado";
  dateResponse: Date;

  question: string = "O que pode acontecer quando você coloca um 0 à direita de um número binário?";
  answers: string[] = ["É dividido por 2", "Nada acontece", "É multiplicado por 10", "O número é dobrado"];

  constructor(
    private router: Router, 
    public toastService: ToastService,
    private questionsService: QuestionsService, 
    private sessionStorageService: SessionStorageService,
  ) {
    this.dateResponse = new Date();
  }

  ngOnInit(): void {
    this.answers.sort(() => Math.random() - 0.5);
    this.imageRef = 1;
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

  processAnswer(answer: string, btn: number): void {
    if (answer == this.expectedResponse) {
      if (this.numberActivity == "1" && this.imageRef === 1) {
        this.handleFirstAnswer(btn);
      } else if (this.numberActivity == "2" && this.imageRef === 2) {
        this.handleSecondAnswer(btn);
      } else if (this.numberActivity == "3" && this.imageRef === 3) {
        this.handleThirdAnswer(btn);
      }

      this.processQuestionResponse(answer, true);
      this.toastService.show('Parabéns!'); 
      setTimeout(() => {
        this.toastService.clear(); 
      }, 1000);

    } else {
      this.handleIncorrectAnswer(answer, btn);
    }
  }

  handleFirstAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.toastService.clear();
      this.answers = ["9", "18", "20", "11"];
      this.question = "Qual número deve estar no lugar da (?) na imagem?";
      this.numberActivity = "2";
      this.expectedResponse = "18";
      this.imageRef = 2;
      this.answers.sort(() => Math.random() - 0.5);
    }, 1000);
  }

  handleSecondAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.toastService.clear();
      this.answers = ["128", "64", "256", "32"];
      this.question = "Um computador precisa de 7 bits para representar todos os caracteres. Isto permite representar até quantos caracteres?";
      this.numberActivity = "3";
      this.expectedResponse = "128";
      this.imageRef = 3;
    }, 1000);
  }

  handleThirdAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.toastService.clear();
      this.router.navigate(['fase-7-3']);
    }, 1000);
  }

  handleIncorrectAnswer(answer: string, btn: number): void {
    this.buttonClass(btn, false);
    this.toastService.show('Tente outra vez.');
    this.attempts += 1;
    this.processQuestionResponse(answer, false);
  }

  buttonClass(button: number, status: boolean): void {
    const buttonClass = status ? "correct" : "incorrect";
    if (button === 1) this.btnClass1 = buttonClass;
    else if (button === 2) this.btnClass2 = buttonClass;
    else if (button === 3) this.btnClass3 = buttonClass;
    else if (button === 4) this.btnClass4 = buttonClass;
    else if (button === 5) this.btnClass5 = buttonClass;

    setTimeout(() => {
      this.btnClass1 = "";
      this.btnClass2 = "";
      this.btnClass3 = "";
      this.btnClass4 = "";
      this.btnClass5 = "";
    }, 1000);
  }
}
