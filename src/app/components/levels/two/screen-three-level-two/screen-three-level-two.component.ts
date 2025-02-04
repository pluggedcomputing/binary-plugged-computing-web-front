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
  ],
})
export class ScreenThreeLevelTwoComponent implements OnInit {
  userResponses: string[] = []; 
  score: number = 0; 
  challengeState: { [key: string]: { allButtonsDisabled: boolean } } = {
    '1': { allButtonsDisabled: false },
    '2': { allButtonsDisabled: false },
    '3': { allButtonsDisabled: false },
    '4': { allButtonsDisabled: false },
  };
  currentActivity: number = 1; 

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

  
  idUser: string = 'Default Data'; 
  idApp: string = 'WEB-BINARIOS 1.0';
  phaseActivity: string = '2';
  numberActivity: string = '1';
  expectedResponse: string = '19';
  dateResponse: Date;

  question: string = 'A sequência em binário 10011 corresponde a que número decimal?';
  answers: string[] = ['19', '5', '13', '7'];

  answer: any;

  constructor(
    private router: Router,
    public toastService: ToastService,
    private fb: FormBuilder,
    private binariosGameService: BinariosGameService 
  ) {
    this.dateResponse = new Date();
  }

  ngOnInit(): void {
    
    this.phaseActivity = '2';
    this.numberActivity = '1';
    
    const savedProgress = this.binariosGameService.getProgress(2);
    if (savedProgress) {
      this.userResponses = savedProgress.userResponses || [];
      this.score = savedProgress.score || 0;
      this.challengeState = savedProgress.challengeState || {
        '1': { allButtonsDisabled: false },
        '2': { allButtonsDisabled: false },
        '3': { allButtonsDisabled: false },
        '4': { allButtonsDisabled: false },
      };
      this.currentActivity = savedProgress.currentActivity || 1;
    } else {
      this.userResponses = [];
      this.score = 0;
      this.challengeState = {
        '1': { allButtonsDisabled: false },
        '2': { allButtonsDisabled: false },
        '3': { allButtonsDisabled: false },
        '4': { allButtonsDisabled: false },
      };
      this.currentActivity = 1;
    }
  }  

  createForm() {
    
    this.answer = this.fb.group({
      text: ['', [Validators.required]], 
    });
  }

  saveProgress(progress: any, level: number, expectedResponse: string): void {

  
  this.binariosGameService.saveProgress(
    progress.userResponses, 
    progress.score, 
    progress.challengeState, 
    progress.currentActivity, 
    expectedResponse, 
    level 
  ); 
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
  
    const isCorrect = (answer === this.expectedResponse);
  
    if (isCorrect) {
      
      this.buttonClass(btn, true);
      this.toastService.show('Parabéns!', 'success');
      this.challengeState[this.numberActivity].allButtonsDisabled = true;
  
      setTimeout(() => {
        this.toastService.clear(); 
      }, 1000);
  
      const progress = {
        userResponses: this.userResponses,
        score: this.score,
        challengeState: this.challengeState,
        currentActivity: this.currentActivity,
      };
  
      this.binariosGameService.saveProgress(
        this.userResponses,
        this.score,
        this.challengeState,
        this.currentActivity,
        this.expectedResponse,
        2 
      );
  
      setTimeout(() => {
        if (this.numberActivity === '1') {
          this.handleFirstAnswer(btn);
        } else if (this.numberActivity === '2') {
          this.handleSecondAnswer(btn);
        } else if (this.numberActivity === '3') {
          this.handleThirdAnswer(btn);
        } else if (this.numberActivity === '4') {
          this.handleFourthAnswer(btn);
        }
      }, 1000);
    } else {

      this.buttonClass(btn, false);
      this.toastService.show('Tente outra vez.', 'error');
  
      setTimeout(() => {
        this.toastService.clear(); 
      }, 1000);
  
      this.challengeState[this.numberActivity].allButtonsDisabled = false;
    }
  
    const progress = {
      userResponses: this.userResponses,
      challengeState: this.challengeState,
      currentActivity: this.currentActivity,
    };
    this.saveProgress(progress, 2, this.expectedResponse);  
  }  

  handleFirstAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.answers = ['01101 e 00011', '10011 e 01101', '00011 e 01100', '01001 e 10001'];
      this.question = 'Os números 3 e 12 correspondem respectivamente à:';
      this.numberActivity = '2';
      this.expectedResponse = '00011 e 01100';
      this.answers.sort(() => Math.random() - 0.5);
    }, 1000);
  }

  handleSecondAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.inputType = true;
      this.question = 'Qual é o MAIOR número decimal que você pode formar utilizando esses cinco cartões?';
      this.numberActivity = '3';
      this.expectedResponse = '31';
      this.createForm(); 
      this.answers.sort(() => Math.random() - 0.5);
    }, 1000);
  }

  handleThirdAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.inputType = true;
      this.question = 'Ainda utilizando os cartões, qual é o MENOR número decimal que você pode formar?';
      this.numberActivity = '4';
      this.expectedResponse = '0';
      this.createForm(); 
      this.answers.sort(() => Math.random() - 0.5);
    }, 1000);
  }

  handleFourthAnswer(btn: number): void {
    this.buttonClass(btn, true);
    setTimeout(() => {
      this.router.navigate(['fase-2-4']);
    }, 1000);
  }

  handleIncorrectAnswer(answer: string, btn: number): void {
    this.buttonClass(btn, false); 
    this.userResponses.push(answer); 
    this.toastService.show('Tente outra vez.', 'error'); 
  
    
    this.challengeState[this.numberActivity].allButtonsDisabled = false;
  
    
    const progress = {
      userResponses: this.userResponses,
      score: this.score,
      challengeState: this.challengeState,
      currentActivity: this.currentActivity,
    };
    this.saveProgress(progress, 2, this.expectedResponse); 
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