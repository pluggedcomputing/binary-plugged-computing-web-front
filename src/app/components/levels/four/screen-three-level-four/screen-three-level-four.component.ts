import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../toast.service';
import { BinariosGameService } from 'src/app/service/binarios-game/binarios-game.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-screen-three-level-four',
  templateUrl: './screen-three-level-four.component.html',
  styleUrls: ['./screen-three-level-four.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({ transform: 'rotateY(179deg)' })),
      state('inactive', style({ transform: 'rotateY(0)' })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in')),
    ])
  ]
})
export class ScreenThreeLevelFourComponent implements OnInit {

  btnClass1: string = '';
  imageRef: number = 1;
  attempts: number = 0;
  userResponses: string[] = [];
  score: number = 0;

  idUser: string = 'Default Data';  
  idApp: string = 'WEB-BINARIOS 1.0';
  phaseActivity: string = '4';
  numberActivity: number = 1;  
  typeOfQuestion: string = 'ABERTA';
  expectedResponse: string = '1';
  dateResponse: Date;

  question: string = 'Você pode identificar a mensagem enviada por Tom? Lembre-se de converter a combinação binária para decimal e fique atento pois as luzes apagadas representam o bit 0 e as luzes acesas representam o bit 1. Qual o decimal correspondente a esta configuração de lâmpadas?';
  answer: any;

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

  constructor(
    private router: Router,
    public toastService: ToastService,
    private fb: FormBuilder,
    private binariosGameService: BinariosGameService
  ) {
    this.dateResponse = new Date();
  }

  ngOnInit(): void {
    this.toastService.clear();
    this.createForm();
    this.imageRef = 1;
  }

  createForm() {
    this.answer = this.fb.group({
      text: ['', [Validators.required]],
    });
  }

  processAnswer(answer: string, btn: number): void {
    this.userResponses.push(answer);

    const isCorrect = answer === this.expectedResponse;

    if (isCorrect) {
      this.buttonClass(true);
      this.toastService.show('Parabéns!', 'success');
    } else {
      this.handleIncorrectAnswer(answer, btn);
    }

    const progress = {
      userResponses: this.userResponses,
      currentActivity: this.numberActivity,
    };

    this.saveProgress(progress, 4, this.expectedResponse, this.numberActivity);

    if (isCorrect) {
      setTimeout(() => {
        this.advanceToNextQuestion();
      }, 1000);
    }
  }

  advanceToNextQuestion() {
    if (this.numberActivity === 1) {
      this.handleFirstAnswer();
    } else if (this.numberActivity === 2) {
      this.handleSecondAnswer();
    } else if (this.numberActivity === 3) {
      this.handleThirdAnswer();
    } else if (this.numberActivity === 4) {
      this.handleFourthAnswer();
    } else if (this.numberActivity === 5) {
      this.handleFifthAnswer();
    } else if (this.numberActivity === 6) {
      this.handleSixthAnswer();
    } else if (this.numberActivity === 7) {
      this.handleSeventhAnswer();
    } else if (this.numberActivity === 8) {
      this.handleEighthAnswer();
    } else if (this.numberActivity === 9) {
      this.handleNinthAnswer();
    } else if (this.numberActivity === 10) {
      this.handleTenthAnswer();
    } else if (this.numberActivity === 11) {
      this.handleEleventhAnswer();
    } else if (this.numberActivity === 12) {
      this.handleTwelfthAnswer();
    } else if (this.numberActivity === 13) {
      this.handleThirteenthAnswer();
    } else if (this.numberActivity === 14) {
      this.handleFourteenthAnswer();
    } else if (this.numberActivity === 15) {
      this.handleFifteenthAnswer();
    } else if (this.numberActivity === 16) {
      this.handleSixteenthAnswer();
    }
  }

  saveProgress(progress: any, level: number, expectedResponse: string, currentActivity: number): void {
    const progressWithScore = {
      ...progress,
      score: this.score,
    };

    this.binariosGameService.saveProgress(
      progressWithScore.userResponses,
      progressWithScore.score,
      currentActivity,  
      expectedResponse,
      4
    );
  }

  calculateFinalScore(): void {
    const totalQuestions = 16;
    const totalAttempts = this.userResponses.length;
    const correctAnswers = totalQuestions;


    const totalErrors = totalAttempts - correctAnswers;


    const errorPercentage = totalErrors / totalAttempts;


    const maxStars = 5;
    const score = Math.max(1, Math.round((1 - errorPercentage) * maxStars));


    this.score = score;

    console.log('Score final:', this.score);
  }

  handleIncorrectAnswer(answer: string, btn: number): void {
    this.buttonClass(false);
    this.toastService.show('Tente outra vez.', 'error');
    this.attempts += 1;
    console.log(this.attempts);
  }

  handleFirstAnswer(): void {
    this.question = 'Qual o número decimal correspondente a esta configuração de lâmpadas?';
    this.numberActivity = 2;
    this.expectedResponse = '10';
    this.imageRef = 2;
    this.answer.reset(); 
  }
  
  handleSecondAnswer(): void {
    this.question = 'Qual o número decimal correspondente a esta configuração de lâmpadas?';
    this.numberActivity = 3;
    this.expectedResponse = '21';
    this.imageRef = 3;
    this.answer.reset(); 
  }
  
  handleThirdAnswer(): void {
    this.question = 'Qual o número decimal correspondente a esta configuração de lâmpadas?';
    this.numberActivity = 4;
    this.expectedResponse = '4';
    this.imageRef = 4;
    this.answer.reset(); 
  }
  
  handleFourthAnswer(): void {
    this.question = 'Qual o número decimal correspondente a esta configuração de lâmpadas?';
    this.numberActivity = 5;
    this.expectedResponse = '5';
    this.imageRef = 5;
    this.answer.reset(); 
  }
  
  handleFifthAnswer(): void {
    this.question = 'Qual o número decimal correspondente a esta configuração de lâmpadas?';
    this.numberActivity = 6;
    this.expectedResponse = '5';
    this.imageRef = 6;
    this.answer.reset(); 
  }
  
  handleSixthAnswer(): void {
    this.question = 'Qual o número decimal correspondente a esta configuração de lâmpadas?';
    this.numberActivity = 7;
    this.expectedResponse = '19';
    this.imageRef = 7;
    this.answer.reset(); 
  }
  
  handleSeventhAnswer(): void {
    this.question = 'Qual o número decimal correspondente a esta configuração de lâmpadas?';
    this.numberActivity = 8;
    this.expectedResponse = '20';
    this.imageRef = 8;
    this.answer.reset(); 
  }
  
  handleEighthAnswer(): void {
    this.question = 'Qual o número decimal correspondente a esta configuração de lâmpadas?';
    this.numberActivity = 9;
    this.expectedResponse = '15';
    this.imageRef = 9;
    this.answer.reset(); 
  }
  
  handleNinthAnswer(): void {
    this.question = 'Qual o número decimal correspondente a esta configuração de lâmpadas?';
    this.numberActivity = 10;
    this.expectedResponse = '21';
    this.imageRef = 10;
    this.answer.reset(); 
  }
  
  handleTenthAnswer(): void {
    this.question = 'Qual o número decimal correspondente a esta configuração de lâmpadas?';
    this.numberActivity = 11;
    this.expectedResponse = '16';
    this.imageRef = 11;
    this.answer.reset(); 
  }
  
  handleEleventhAnswer(): void {
    this.question = 'Qual o número decimal correspondente a esta configuração de lâmpadas?';
    this.numberActivity = 12;
    this.expectedResponse = '18';
    this.imageRef = 12;
    this.answer.reset(); 
  }
  
  handleTwelfthAnswer(): void {
    this.question = 'Qual o número decimal correspondente a esta configuração de lâmpadas?';
    this.numberActivity = 13;
    this.expectedResponse = '5';
    this.imageRef = 13;
    this.answer.reset(); 
  }
  
  handleThirteenthAnswer(): void {
    this.question = 'Qual o número decimal correspondente a esta configuração de lâmpadas?';
    this.numberActivity = 14;
    this.expectedResponse = '19';
    this.imageRef = 14;
    this.answer.reset(); 
  }
  
  handleFourteenthAnswer(): void {
    this.question = 'Qual o número decimal correspondente a esta configuração de lâmpadas?';
    this.numberActivity = 15;
    this.expectedResponse = '15';
    this.imageRef = 15;
    this.answer.reset(); 
  }
  
  handleFifteenthAnswer(): void {
    this.question = 'Qual o número decimal correspondente a esta configuração de lâmpadas?';
    this.numberActivity = 16;
    this.expectedResponse = 'ajude estou preso';
    this.imageRef = 16;
    this.answer.reset(); 
  }

  handleSixteenthAnswer(): void {
    this.calculateFinalScore();
    this.router.navigate(['fase-4-4'], { queryParams: { score: this.score } });
  }

  buttonClass(status: boolean): void {
    this.btnClass1 = status ? 'correct' : 'incorrect';
    setTimeout(() => { this.btnClass1 = ''; }, 1000);
  }

  toggleBynaries(): void {
    this.byn1 = this.flip1 === 'active' ? 0 : 1;
    this.byn2 = this.flip2 === 'active' ? 0 : 1;
    this.byn4 = this.flip4 === 'active' ? 0 : 1;
    this.byn8 = this.flip8 === 'active' ? 0 : 1;
    this.byn16 = this.flip16 === 'active' ? 0 : 1;
  }

  changeAnswers(value: string): void {
    this.processAnswer(value, 1);
  }
}
