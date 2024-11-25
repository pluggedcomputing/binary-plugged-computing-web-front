import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../toast.service';
import { Question } from 'src/app/models/question.model';
import { QuestionsService } from 'src/app/service/question/questions.service';
import { SessionStorageService } from 'src/app/service/session-storage/session-storage-service.service';

@Component({
  selector: 'app-screen-three-level-six',
  templateUrl: './screen-three-level-six.component.html',
  styleUrls: ['./screen-three-level-six.component.css']
})
export class ScreenThreeLevelSixComponent implements OnInit {

  btnClass1: string = "";
  btnClass2: string = "";
  btnClass3: string = "";
  btnClass4: string = "";
  btnClass5: string = "";

  imageRef: number | undefined;

  attempts: number = 0;
   
   idUser: string = this.sessionStorageService.getItem('userID') || 'Default Data';
   idApp: string = "WEB-BINARIOS 1.0"
   phaseActivity: string = "6"
   numberActivity: string = "1";
   typeOfQuestion: string = "MULTIPLA ESCOLHA"
   expectedResponse: string = "11110"
   dateResponse: Date;
   

  question: string = "Utilizando apenas uma mão, qual a representação do número de 30 em binário?";

  answers: string[] = ["11110", "11101", "01001", "01111"];

  constructor(
    private router: Router,
    public toastService: ToastService,
    private questionsService: QuestionsService, 
    private sessionStorageService: SessionStorageService
     ) {
      this.dateResponse = new Date();
  }

  ngOnInit(): void {
    this.answers.sort(() => Math.random() - 0.5);
    this.imageRef = 1;
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

  processAnswer(answer: string, btn: number): void {
    if (answer == this.expectedResponse){
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
      this.answers = ["080", "111", "394", "691"];
      this.question = "Agora com as duas mãos converta o número 1010110011 para decimal.";
      this.numberActivity = "2";
      this.expectedResponse = "691";
      this.imageRef = 2;
      this.answers.sort(() => Math.random() - 0.5);
    }, 1000);
  }

  handleSecondAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.toastService.clear();
      this.answers = ["32.768", "1.048.575", "33.554.432", "1.073.741"];
      this.question = "Se os dedos dos seus pés forem realmente flexíveis, seria possível obter números ainda maiores. Qual o maior número que se poderia contar utilizando seus 20 dedos?";
      this.numberActivity = "3";
      this.expectedResponse = "1.048.575";
      this.imageRef = 3;
      this.answers.sort(() => Math.random() - 0.5);
    }, 1000);
  }

  handleThirdAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.toastService.clear();
      this.router.navigate(['fase-6-4']);
    }, 1000);
  }

  handleIncorrectAnswer(answer: string, btn: number): void {
    this.buttonClass(btn, false);
    this.toastService.show('Tente outra vez.', 'error'); 
    this.attempts += 1;
    console.log(this.attempts);
    this.processQuestionResponse(answer, false);
  }  

  buttonClass(button: number, status: boolean): void {
    if (button == 1) {
      this.btnClass1 = status ? "correct" : "incorrect";
      setTimeout(() => { this.btnClass1 = ""; }, 1000);
    }
    if (button == 2) {
      this.btnClass2 = status ? "correct" : "incorrect";
      setTimeout(() => { this.btnClass2 = ""; }, 1000);
    }
    if (button == 3) {
      this.btnClass3 = status ? "correct" : "incorrect";
      setTimeout(() => { this.btnClass3 = ""; }, 1000);
    }
    if (button == 4) {
      this.btnClass4 = status ? "correct" : "incorrect";
      setTimeout(() => { this.btnClass4 = ""; }, 1000);
    }
    if (button == 5) {
      this.btnClass5 = status ? "correct" : "incorrect";
      setTimeout(() => { this.btnClass5 = ""; }, 1000);
    }
  }

}
