import { Component } from '@angular/core';
import { EmailInputService } from 'src/app/service/email/email-input.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css']
})
export class EmailInputComponent {

  userEmail: string = "";
  submitted: boolean = false;

  constructor(
    private emailInputService: EmailInputService,
    private router: Router
  ) { }

  submitEmail() {
    if (!this.userEmail) {
      this.submitted = true;
      return;
    }
    const user: User = { email: this.userEmail };
    
    this.emailInputService.saveUser(user).subscribe(
      response => {
        console.log("User saved successfully:", response);
        this.router.navigate(['/fases']);
      },
      error => {
        console.error("Error saving user:", error);
        
      }
    );
    this.emailInputService.email = this.userEmail;
  }

  submitUserAnonymous(){
    
    const user: User = { email: "Anonymous"};
    
    this.emailInputService.saveUser(user).subscribe(
      response => {
        console.log("User saved successfully:", response);
      },
      error => {
        console.error("Error saving user:", error);
        
      }
    );
    this.emailInputService.email = "Anonymous";
    this.router.navigate(['/fases']);
      
  }

  
}
