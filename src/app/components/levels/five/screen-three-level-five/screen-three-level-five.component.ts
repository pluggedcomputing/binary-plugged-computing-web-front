import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../toast.service';
import { Question } from 'src/app/models/question.model';
import { QuestionsService } from 'src/app/service/question/questions.service';
import { EmailInputService } from 'src/app/service/email/email-input.service';

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

  idUser: string = this.emailInputService.email
  idApp: string = "WEB-BINARIOS 1.0"
  phaseActivity: string = "5"
  numberActivity: string = "1";
  typeOfQuestion: string = "ABERTA"
  expectedResponse: string = "";
  dateResponse: Date;

  question: string = "Vamos agora tentar mandar uma mensagem codificada como fez o Tom? Para isso, digite abaixo a mensagem a enviar. Para facilitar, digite apenas o seu primeiro nome no campo abaixo.";

  answer: any;

  constructor(
    private router: Router, 
    public toastService: ToastService,
     private fb: FormBuilder,
     private questionsService: QuestionsService, 
     private emailInputService: EmailInputService    
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
    let codifiedName: string = "";
    if(value !== "" && this.imageRef === 1) {
        this.buttonClass(true);
        codifiedName = this.textToBinary(value.toLowerCase());
        this.originalName = value.toLowerCase();
        this.expectedResponse = 'muito prazer ' + this.originalName;
        setTimeout(() => {
          this.question = `Opaaa! O Tom recebeu a sua mensagem e já te respondeu... <br> Traduza para saber o que ele te falou: <br> 01101 10101 01001 10100 01111 &nbsp;&nbsp; 10000 10010 00001 11010 00101 10010 &nbsp;&nbsp; ${codifiedName}`;
          this.createForm();
          this.imageRef = 2;
          console.log(codifiedName);
          console.log(value);
        },1000);
    } else if((value.toLowerCase() === `muito prazer ${this.originalName}`) && this.imageRef === 2) {
        this.buttonClass(true);
        setTimeout(() => {
          this.processQuestionResponse(value, true);
          this.router.navigate(['fase-5-4']);
        },1000);
      } else if (value.toLowerCase() !== `muito prazer ${this.originalName}` && this.imageRef === 2){
        this.processQuestionResponse(value, false);   
      } else {
      this.buttonClass(false);
      this.toastService.show(this.imageRef === 1 ? 'Este campo não pode ficar em branco.' : 'Tente outra vez.');
      this.attempts += 1;
      console.log(this.attempts);
      console.log(value);
      console.log(this.originalName);
    }
  }

  buttonClass(status: boolean): void {
    this.btnClass1 = status ? "correct" : "incorrect";
    setTimeout(() => {this.btnClass1 = "";},1000);
  }

  textToBinary(text: string) {
    return text.split('').map(function (char: string) {
        return char.charCodeAt(0).toString(2).slice(-5);
    }).join(' ');
  }

}
