import { ToastService } from '../../toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Question } from 'src/app/models/question.model';
import { QuestionsService } from 'src/app/service/question/questions.service';
import { SessionStorageService } from 'src/app/service/session-storage/session-storage-service.service';

@Component({
  selector: 'app-screen-three-level-one',
  templateUrl: './screen-three-level-one.component.html',
  styleUrls: ['./screen-three-level-one.component.css'],
  animations: [
    trigger('flipState', [
      state(
        'active',
        style({
          transform: 'rotateY(179deg)',
        })
      ),
      state(
        'inactive',
        style({
          transform: 'rotateY(0)',
        })
      ),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in')),
    ]),
  ]
})
export class ScreenThreeLevelOneComponent implements OnInit {

  flip1: string = 'inactive';
  flip2: string = 'active';
  flip4: string = 'active';
  flip8: string = 'inactive';
  flip16: string = 'active';

  byn1: number = 1;
  byn2: number = 0;
  byn4: number = 0;
  byn8: number = 1;
  byn16: number = 0;

  btnClass1: string = "";
  btnClass2: string = "";
  btnClass3: string = "";
  btnClass4: string = "";

  attempts: number = 0;
  
  idUser: string = "";
  idApp: string = "WEB-BINARIOS 1.0";
  phaseActivity: string = "1";
  numberActivity: string = "1";
  typeOfQuestion: string = "MULTIPLA ESCOLHA";
  expectedResponse: string = "Possuem metade do valor anterior";
  dateResponse: Date;
  
  question: string = "O que você percebeu sobre o número de pontos nos cartões?";
  answers: string[] = ["Possuem metade do valor anterior", "São valores aleatórios", "São a soma do próximo com o anterior", "Estão em ordem crescente"];

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
    this.idUser = this.sessionStorageService.getItem('userID') || 'Default Data';
  }

  toggleFlip(card: number): void {
    if (card === 1) {
      this.flip1 = this.flip1 === 'inactive' ? 'active' : 'inactive';
    } else if (card === 2) {
      this.flip2 = this.flip2 === 'inactive' ? 'active' : 'inactive';
    } else if (card === 4) {
      this.flip4 = this.flip4 === 'inactive' ? 'active' : 'inactive';
    } else if (card === 8) {
      this.flip8 = this.flip8 === 'inactive' ? 'active' : 'inactive';
    } else if (card === 16) {
      this.flip16 = this.flip16 === 'inactive' ? 'active' : 'inactive';
    }
    this.toggleBynaries();
  }

  processAnswer(answer: string, btn: number): void {
    if (answer === this.expectedResponse) {
      if (this.numberActivity === "1") {
        this.handleFirstAnswer(btn);
      } else if (this.numberActivity === "2") {
        this.handleSecondAnswer(btn);
      } else if (this.numberActivity === "3") {
        this.handleThirdAnswer(btn);
      }
      this.processQuestionResponse(answer, true);
      this.toastService.show('Parabéns!'); 
    } else {
      this.handleIncorrectAnswer(answer, btn);
    }
  }

  processQuestionResponse(userResponse: string, isCorrect: boolean): void {
    const question = new Question(this.idUser, this.idApp, this.phaseActivity, this.numberActivity, userResponse, this.expectedResponse, isCorrect, this.dateResponse, this.typeOfQuestion);
    this.questionsService.saveResponseQuestion(question).subscribe(
      response => {
        console.log("Question saved successfully:", response);
      },
      error => {
        console.error("Error saving question:", error);
      }
    );
  }

  handleFirstAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.answers = ["24", "20", "32", "18"];
      this.question = "Quantos pontos teria o próximo cartão à esquerda?";
      this.numberActivity = "2";
      this.expectedResponse = "32";
      this.answers.sort(() => Math.random() - 0.5);
      this.toastService.clear(); 
    }, 1000);
  }

  handleSecondAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.answers = ["01101", "10001", "10011", "01001"];
      this.question = "Como seria o número 17 em binário? <br> Dica: veja os números abaixo dos cartões.";
      this.numberActivity = "3";
      this.expectedResponse = "10001";
      this.answers.sort(() => Math.random() - 0.5);
      this.toastService.clear();
    }, 1000);
  }

  handleThirdAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.toastService.clear(); 
      this.router.navigate(['fase-1-4']);
    }, 1000);
  }

  handleIncorrectAnswer(answer: string, btn: number): void {
    this.buttonClass(btn, false);
    this.toastService.show('Tente outra vez.');
    this.attempts += 1;
    console.log(this.attempts);
    this.processQuestionResponse(answer, false);
  }

  toggleBynaries(): void {
    this.byn1 = this.flip1 === 'active' ? 0 : 1;
    this.byn2 = this.flip2 === 'active' ? 0 : 1;
    this.byn4 = this.flip4 === 'active' ? 0 : 1;
    this.byn8 = this.flip8 === 'active' ? 0 : 1;
    this.byn16 = this.flip16 === 'active' ? 0 : 1;
  }

  buttonClass(button: number, status: boolean): void {
    if (button === 1) {
      this.btnClass1 = status ? "correct" : "incorrect";
      setTimeout(() => { this.btnClass1 = ""; }, 1000);
    }
    if (button === 2) {
      this.btnClass2 = status ? "correct" : "incorrect";
      setTimeout(() => { this.btnClass2 = ""; }, 1000);
    }
    if (button === 3) {
      this.btnClass3 = status ? "correct" : "incorrect";
      setTimeout(() => { this.btnClass3 = ""; }, 1000);
    }
    if (button === 4) {
      this.btnClass4 = status ? "correct" : "incorrect";
      setTimeout(() => { this.btnClass4 = ""; }, 1000);
    }
  }
}
