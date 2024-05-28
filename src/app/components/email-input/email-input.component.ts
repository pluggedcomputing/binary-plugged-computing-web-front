import { Component } from '@angular/core';
import { EmailInputService } from 'src/app/service/email/email-input.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/service/session-storage/session-storage-service.service';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css']

})


export class EmailInputComponent {

  userID: string = "";
  submitted: boolean = false;

  constructor(
    private emailInputService: EmailInputService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) { }



  submitEmail() {
    if (!this.userID) {
      this.submitted = true;
      return;
    }
    const user: User = { email: this.userID };
    this.emailInputService.email = this.userID;
    this.emailInputService.saveUser(user).subscribe(
      response => {
        this.sessionStorageService.setItem('userID', this.userID);
        console.log("User saved successfully:", response);
      },
      error => {
        console.error("Error saving user:", error);
        alert("Houve um erro ao se conectar, você esta usando o sistema offline!");
        
      }
    );
    this.router.navigate(['/fases']);
    
  }


  submitUserAnonymous(){
    const user: User = { email: "Anonymous"};
    
    this.emailInputService.saveUser(user).subscribe(
      response => {
        console.log("User saved successfully:", response);
      },
      error => {
        console.error("Error saving user:", error);
        alert("Houve um erro ao se conectar, você esta usando o sistema offline");
        
      }
    );
    this.emailInputService.email = "Anonymous";
    this.router.navigate(['/fases']);
      
  }

  
}
