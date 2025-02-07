import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/service/session-storage/session-storage-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  username: string = '';  
  userID: string = '';    
  isUsernameSectionVisible: boolean = false;  
  originalUsername: string = '';  

  constructor(private router: Router, private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    this.userID = sessionStorage.getItem('userID') || '';

    if (this.userID !== 'Anonymous') {
      const savedUsername = localStorage.getItem(this.userID);  
      if (savedUsername) {
        this.username = savedUsername;
        this.originalUsername = savedUsername; 
      }
    }
  }

  toggleUsernameSection(): void {
    if (this.isUsernameSectionVisible) {
      
      this.username = this.originalUsername;
    } else {
      
      this.username = this.originalUsername;
    }

    this.isUsernameSectionVisible = !this.isUsernameSectionVisible;
  }

  saveUsername(): void {
    
    if (this.username.trim() && this.username !== this.originalUsername) {
      localStorage.setItem(this.userID, this.username);
      this.originalUsername = this.username; 
      alert('Nome salvo com sucesso!');
      this.isUsernameSectionVisible = false;
    } else if (this.username === this.originalUsername) {
      alert('O nome é o mesmo que o anterior. Nenhuma alteração foi feita.');
    } else {
      alert('Por favor, insira um nome válido.');
    }
  }

  clearUsername(): void {
    this.username = '';  
  }

  cancelEditing(): void {
    this.username = this.originalUsername; 
    this.isUsernameSectionVisible = false;  
  }

  clearProgress(): void {
    const confirmClear = confirm('Tem certeza de que deseja apagar todos os dados?');
    if (confirmClear) {
      localStorage.clear();  
      sessionStorage.clear();  
      alert('Todos os dados foram apagados!');
      
      
      this.router.navigate(['/email-input']);
    }
  }

  navigateToLevels(): void {
    this.router.navigate(['/fases']); 
  }
}