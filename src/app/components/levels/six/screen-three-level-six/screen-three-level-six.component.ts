import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../toast.service';
import { BinariosGameService } from 'src/app/service/binarios-game/binarios-game.service';

@Component({
  selector: 'app-screen-three-level-six',
  templateUrl: './screen-three-level-six.component.html',
  styleUrls: ['./screen-three-level-six.component.css']
})
export class ScreenThreeLevelSixComponent implements OnInit {
  userResponses: string[] = [];  
  score: number = 0;  
  currentActivity: number = 1; 
  question: string = 'Utilizando apenas uma mão, qual a representação do número de 30 em binário?';
  expectedResponse: string = '11110'; 
  answers: string[] = ['11110', '11101', '01001', '01111'];
  btnClass1: string = '';
  btnClass2: string = '';
  btnClass3: string = '';
  btnClass4: string = '';

  imageRef: number | undefined;
  attempts: number = 0;

  idUser: string = 'Default Data'; 
  idApp: string = 'WEB-BINARIOS 1.0';
  phaseActivity: string = '6';
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

    this.saveProgress(progress, 6, this.expectedResponse, this.currentActivity);

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
      6                            
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
      this.answers = ['080', '111', '394', '691'];
      this.question = 'Agora com as duas mãos converta o número 1010110011 para decimal.';
      this.currentActivity = 2;  
      this.expectedResponse = '691';
      this.imageRef = 2;
      this.answers.sort(() => Math.random() - 0.5);
    }, 1000);
  }

  handleSecondAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.answers = ['32.768', '1.048.575', '33.554.432', '1.073.741'];
      this.question = 'Se os dedos dos seus pés forem realmente flexíveis, seria possível obter números ainda maiores. Qual o maior número que se poderia contar utilizando seus 20 dedos?';
      this.currentActivity = 3;  
      this.expectedResponse = '1.048.575';
      this.imageRef = 3;
      this.answers.sort(() => Math.random() - 0.5);
    }, 1000);
  }

  handleThirdAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.calculateFinalScore();  
      this.router.navigate(['fase-6-4'], { queryParams: { score: this.score } });  
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
