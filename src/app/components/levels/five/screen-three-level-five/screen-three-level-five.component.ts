import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../toast.service';
import { BinariosGameService } from 'src/app/service/binarios-game/binarios-game.service';

@Component({
  selector: 'app-screen-three-level-five',
  templateUrl: './screen-three-level-five.component.html',
  styleUrls: ['./screen-three-level-five.component.css']
})
export class ScreenThreeLevelFiveComponent implements OnInit {

  btnClass1: string = "";
  originalName: string = "";
  imageRef: number | undefined;
  attempts: number = 0;

  idUser: string = 'Default Data';
  idApp: string = "WEB-BINARIOS 1.0";
  phaseActivity: string = "5";
  currentActivity: number = 1; 
  expectedResponse: string = "";
  dateResponse: Date;

  question: string = "Vamos agora tentar mandar uma mensagem codificada como fez o Tom? Para isso, digite abaixo a mensagem a enviar. Para facilitar, digite apenas o seu primeiro nome no campo abaixo.";
  answer: any;

  userResponses: string[] = [];  
  score: number = 0;  

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
      text: ['', [Validators.required]]
    });
  }

  processAnswer(answer: string): void {
    if (this.currentActivity === 1 && answer.trim() === "") {
      this.buttonClass(false); 
      this.toastService.show('Este campo não pode ficar em branco.', 'error');
      this.attempts += 1;
      return; 
    }
  
    this.userResponses.push(answer);
    let isCorrect = false;
  
    if (this.currentActivity === 1) {
      let codifiedName = this.textToBinary(answer.toLowerCase());
      this.originalName = answer.toLowerCase();
      this.expectedResponse = `muito prazer ${this.originalName}`;
  
      isCorrect = true;
      this.buttonClass(true); 
  
      const progress = {
        userResponses: this.userResponses,  
        score: 0  
      };
      this.saveProgress(progress, 5, this.expectedResponse, this.currentActivity);
  
      setTimeout(() => {
        this.question = `Opaaa! O Tom recebeu a sua mensagem e já te respondeu... <br> Traduza para saber o que ele te falou: <br> 01101 10101 01001 10100 01111 &nbsp;&nbsp; 10000 10010 00001 11010 00101 10010 &nbsp;&nbsp; ${codifiedName}`;
        this.imageRef = 2; 
        this.createForm();  
        this.advanceToNextQuestion(); 
      }, 1000);
    }
  
    if (this.currentActivity === 2) {
      isCorrect = answer.toLowerCase() === this.expectedResponse.toLowerCase();
  
      if (isCorrect) {
        this.buttonClass(true); 
        this.toastService.show('Parabéns!', 'success');
        this.calculateFinalScore(); 
  
        setTimeout(() => {
          this.saveProgress({
            userResponses: this.userResponses,
            score: this.score
          }, 5, this.expectedResponse, this.currentActivity);  
          this.router.navigate(['fase-5-4'], { queryParams: { score: this.score } });  
        }, 1000);
      } else {
        this.handleIncorrectAnswer(answer);  
      }
    }
  }
  
  advanceToNextQuestion() {
    if (this.currentActivity === 1) {
      this.question = `Opaaa! O Tom recebeu a sua mensagem e já te respondeu... <br> Traduza para saber o que ele te falou: <br> 01101 10101 01001 10100 01111 &nbsp;&nbsp; 10000 10010 00001 11010 00101 10010 &nbsp;&nbsp; ${this.textToBinary(this.originalName)}`;
      this.imageRef = 2;  
      this.expectedResponse = `muito prazer ${this.originalName}`; 
      this.createForm();  
      this.currentActivity = 2; 
    } else if (this.currentActivity === 2) {
      this.handleSecondAnswer(); 
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
      5
    );
  }

  calculateFinalScore(): void {
    const totalQuestions = 2;  
    const totalAttempts = this.userResponses.length;
    const correctAnswers = totalQuestions;

    const totalErrors = totalAttempts - correctAnswers;

    const errorPercentage = totalErrors / totalAttempts;

    const maxStars = 5;
    const score = Math.max(1, Math.round((1 - errorPercentage) * maxStars));

    this.score = score;

    console.log('Score final:', this.score);
  }

  handleIncorrectAnswer(answer: string): void {
    this.buttonClass(false); 
    this.toastService.show('Tente outra vez.', 'error');
    this.attempts += 1;
    console.log(this.attempts);
  }

  handleSecondAnswer(): void {
    this.buttonClass(true);
    setTimeout(() => {
      this.calculateFinalScore();  
      this.router.navigate(['fase-5-4'], { queryParams: { score: this.score } });  
    }, 1000);
  }

  buttonClass(status: boolean): void {
    this.btnClass1 = status ? 'correct' : 'incorrect';  
    setTimeout(() => { this.btnClass1 = ''; }, 1000); 
  }  

  textToBinary(text: string) {
    return text.split('').map(function (char: string) {
      return char.charCodeAt(0).toString(2).slice(-5);
    }).join(' ');
  }
}
