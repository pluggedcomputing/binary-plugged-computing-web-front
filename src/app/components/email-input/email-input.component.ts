import { Component } from '@angular/core';
import { UserInputService } from 'src/app/service/user/user.service';
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
    private userInputService: UserInputService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) { }

  submitUserID() {
    if (!this.userID) {
      this.submitted = true;
      return;
    }
    const user: User = { userID: this.userID };
    this.userInputService.userID = this.userID;
    this.userInputService.saveUser(user).subscribe(
      response => {
        this.sessionStorageService.setItem('userID', this.userID);
        console.log("User saved successfully:", response);      
      },
      error => {
        console.error("Error saving user:", error);
        alert("Houve um erro ao se conectar, você está usando o sistema offline!");
      }
    );
    console.log(this.userID);
    this.router.navigate(['/fases']); 
  }

  submitUserAnonymous() {
    const user: User = { userID: "Anonymous" };
    this.userInputService.userID = "Anonymous";
    this.userInputService.saveUser(user).subscribe(
      response => {
        this.sessionStorageService.setItem('userID', "Anonymous");
        console.log("User saved successfully:", response);
        
      },
      error => {
        console.error("Error saving user:", error);
        alert("Houve um erro ao se conectar, você está usando o sistema offline!");
      }
    );
    console.log("Anonymous");
    this.router.navigate(['/fases']); 
  }
}
