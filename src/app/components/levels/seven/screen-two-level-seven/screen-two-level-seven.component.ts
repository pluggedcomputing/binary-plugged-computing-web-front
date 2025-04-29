import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../toast.service';
import { BinariosGameService } from 'src/app/service/binarios-game/binarios-game.service';

@Component({
  selector: 'app-screen-two-level-seven',
  templateUrl: './screen-two-level-seven.component.html',
  styleUrls: ['./screen-two-level-seven.component.css']
})
export class ScreenTwoLevelSevenComponent implements OnInit {
  userResponses: string[] = [];  
  score: number = 0;  
  currentActivity: number = 1; 
  question: string = 'O que pode acontecer quando você coloca um 0 à direita de um número binário?';
  expectedResponse: string = 'O número é dobrado'; 
  answers: string[] = ['É dividido por 2', 'Nada acontece', 'É multiplicado por 10', 'O número é dobrado'];
  btnClass1: string = '';
  btnClass2: string = '';
  btnClass3: string = '';
  btnClass4: string = '';

  imageRef: number | undefined;
  attempts: number = 0;

  idUser: string = 'Default Data'; 
  idApp: string = 'WEB-BINARIOS 1.0';
  phaseActivity: string = '7';
  numberActivity: string = '1';
  typeOfQuestion: string = 'MULTIPLA ESCOLHA';
  dateResponse: Date;

  constructor(
    private router: Router,
    public toastService: ToastService,
    private binariosGameService: BinariosGameService
  ) {
    this.dateResponse = new Date();
  }

  ngOnInit(): void {
    this.imageRef = 1;
    this.toastService.clear();
    this.answers.sort(() => Math.random() - 0.5);
  }

  processAnswer(answer: string, btn: number): void {
    this.userResponses.push(answer);
    const isCorrect = answer === this.expectedResponse;

    if (isCorrect) {
      this.buttonClass(btn, true);
      this.toastService.show('Parabéns!', 'success');
    } else {
      this.handleIncorrectAnswer(answer, btn);
    }

    const progress = {
      userResponses: this.userResponses,
      currentActivity: this.currentActivity,
    };

    this.saveProgress(progress, 7, this.expectedResponse, this.currentActivity);

    if (isCorrect) {
      setTimeout(() => {
        if (this.currentActivity === 1) {
          this.handleFirstAnswer(btn);
        } else if (this.currentActivity === 2) {
          this.handleSecondAnswer(btn);
        } else if (this.currentActivity === 3) {
          this.handleThirdAnswer(btn);
        }
      }, 1000);
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
      level                             
    );
  }

  handleIncorrectAnswer(answer: string, btn: number): void {
    this.buttonClass(btn, false);
    this.toastService.show('Tente outra vez.', 'error');
    this.attempts += 1;
  }

  handleFirstAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.answers = ['9', '18', '20', '11'];
      this.question = 'Qual número deve estar no lugar da (?) na imagem?';
      this.currentActivity = 2;  
      this.expectedResponse = '18';
      this.imageRef = 2;
      this.answers.sort(() => Math.random() - 0.5);
    }, 1000);
  }

  handleSecondAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.answers = ['128', '64', '256', '32'];
      this.question = 'Um computador precisa de 7 bits para representar todos os caracteres. Isto permite representar até quantos caracteres?';
      this.currentActivity = 3;  
      this.expectedResponse = '128';
      this.imageRef = 3;
      this.answers.sort(() => Math.random() - 0.5);
    }, 1000);
  }

  handleThirdAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.calculateFinalScore();  
      this.router.navigate(['fase-7-3'], { queryParams: { score: this.score } });  
    }, 1000);
  }

  calculateFinalScore(): void {
    const totalQuestions = 3; 
    const totalAttempts = this.userResponses.length; 
    const correctAnswers = totalQuestions; 

    const totalErrors = totalAttempts - correctAnswers;
    const errorPercentage = totalErrors / totalAttempts;

    const maxStars = 5;
    const score = Math.max(1, Math.round((1 - errorPercentage) * maxStars));

    this.score = score;

    console.log('Score final:', this.score);  
  }

  buttonClass(button: number, status: boolean): void {
    if (button === 1) {
      this.btnClass1 = status ? 'correct' : 'incorrect';
      setTimeout(() => { this.btnClass1 = ''; }, 1000);
    }
    if (button === 2) {
      this.btnClass2 = status ? 'correct' : 'incorrect';
      setTimeout(() => { this.btnClass2 = ''; }, 1000);
    }
    if (button === 3) {
      this.btnClass3 = status ? 'correct' : 'incorrect';
      setTimeout(() => { this.btnClass3 = ''; }, 1000);
    }
    if (button === 4) {
      this.btnClass4 = status ? 'correct' : 'incorrect';
      setTimeout(() => { this.btnClass4 = ''; }, 1000);
    }
  }
}
