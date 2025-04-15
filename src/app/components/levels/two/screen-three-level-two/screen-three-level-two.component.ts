import { ToastService } from '../../toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, Validators } from '@angular/forms'; 
import { BinariosGameService } from 'src/app/service/binarios-game/binarios-game.service';

@Component({
  selector: 'app-screen-three-level-two',
  templateUrl: './screen-three-level-two.component.html',
  styleUrls: ['./screen-three-level-two.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({ transform: 'rotateY(179deg)' })),
      state('inactive', style({ transform: 'rotateY(0)' })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in')),
    ]),
  ]
})
export class ScreenThreeLevelTwoComponent implements OnInit {
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

  btnClass1: string = '';
  btnClass2: string = '';
  btnClass3: string = '';
  btnClass4: string = '';
  btnClass5: string = '';

  inputType: boolean = false;

  attempts: number = 0;
  userResponses: string[] = [];  
  score: number = 0;  
  starsArray: number[] = [];  
  emptyStarsArray: number[] = [];  
  congratulations_message: string = '';  

  
  idUser: string = 'Default Data'; 
  idApp: string = 'WEB-BINARIOS 1.0';
  phaseActivity: string = '2';
  numberActivity: number = 1;  
  typeOfQuestion: string = 'MULTIPLA ESCOLHA';
  expectedResponse: string = '19';
  dateResponse: Date;

  question: string = 'A sequência em binário 10011 corresponde a que número decimal?';
  answers: string[] = ['19', '5', '13', '7'];

  answer: any;

  constructor(
    private router: Router,
    public toastService: ToastService,
    private binariosGameService: BinariosGameService,
    private fb: FormBuilder 
  ) {
    this.dateResponse = new Date();
  }

  ngOnInit(): void {
    this.toastService.clear();
    this.createForm();
    this.answers.sort(() => Math.random() - 0.5);
  }

  createForm() {
    this.answer = this.fb.group({
      text: ['', [Validators.required]],
    });
  }

  toggleFlip(card: number): void {
    if (card == 1) {
      this.flip1 = this.flip1 == 'inactive' ? 'active' : 'inactive';
    } else if (card == 2) {
      this.flip2 = this.flip2 == 'inactive' ? 'active' : 'inactive';
    } else if (card == 4) {
      this.flip4 = this.flip4 == 'inactive' ? 'active' : 'inactive';
    } else if (card == 8) {
      this.flip8 = this.flip8 == 'inactive' ? 'active' : 'inactive';
    } else if (card == 16) {
      this.flip16 = this.flip16 == 'inactive' ? 'active' : 'inactive';
    }
    this.toggleBynaries();
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
      currentActivity: this.numberActivity,
    };

    this.saveProgress(progress, 2, this.expectedResponse, this.numberActivity);

    if (isCorrect) {
      setTimeout(() => {
        if (this.numberActivity == 1) {
          this.handleFirstAnswer(btn);
        } else if (this.numberActivity == 2) {
          this.handleSecondAnswer(btn);
        } else if (this.numberActivity == 3) {
          this.handleThirdAnswer(btn);
        } else if (this.numberActivity == 4) {
          this.handleFourthAnswer(btn);
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
      2
    );
  }

  handleIncorrectAnswer(answer: string, btn: number): void {
    this.buttonClass(btn, false);
    this.toastService.show('Tente outra vez.', 'error');
    this.attempts += 1;
    console.log(this.attempts);
  }

  handleFirstAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.answers = ['01101 e 00011', '10011 e 01101', '00011 e 01100', '01001 e 10001'];
      this.question = 'Os números 3 e 12 correspondem respectivamente à:';
      this.numberActivity = 2; 
      this.expectedResponse = '00011 e 01100';
      this.answers.sort(() => Math.random() - 0.5);
    }, 1000);
  }

  handleSecondAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.typeOfQuestion = 'ABERTA';
      this.question = 'Qual é o MAIOR número decimal que você pode formar utilizando esses cinco cartões?';
      this.numberActivity = 3; 
      this.expectedResponse = '31';
      this.inputType = true;
      this.answers.sort(() => Math.random() - 0.5);
    }, 1000);
  }

  handleThirdAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.question = 'Ainda utilizando os cartões, qual é o MENOR número decimal que você pode formar?';
      this.numberActivity = 4; 
      this.expectedResponse = '0';
      this.createForm();
      this.inputType = true;
      this.answers.sort(() => Math.random() - 0.5);
    }, 1000);
  }

  handleFourthAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.calculateFinalScore();
      this.router.navigate(['fase-2-4'], { queryParams: { score: this.score } });
    }, 1000);
  }

  calculateFinalScore(): void {
    const totalQuestions = 4;
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
    if (button === 5) {
      this.btnClass5 = status ? 'correct' : 'incorrect';
      setTimeout(() => { this.btnClass5 = ''; }, 1000);
    }
  }

  toggleBynaries(): void {
    this.byn1 = this.flip1 === 'active' ? 0 : 1;
    this.byn2 = this.flip2 === 'active' ? 0 : 1;
    this.byn4 = this.flip4 === 'active' ? 0 : 1;
    this.byn8 = this.flip8 === 'active' ? 0 : 1;
    this.byn16 = this.flip16 === 'active' ? 0 : 1;
  }
}
