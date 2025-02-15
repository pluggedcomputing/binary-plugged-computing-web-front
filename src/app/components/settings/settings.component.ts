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
  isEditing: boolean = false;  
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
    this.isEditing = !this.isEditing;
  }

  saveUsername(): void {
    if (this.username.trim() && this.username !== this.originalUsername) {
      localStorage.setItem(this.userID, this.username);
      this.originalUsername = this.username; 
      alert('Nome salvo com sucesso!');
      this.isEditing = false;  
    } else if (this.username === this.originalUsername) {
      alert('O nome é o mesmo que o anterior. Nenhuma alteração foi feita.');
    } else {
      alert('Por favor, insira um nome válido.');
    }
  }

  cancelEditing(): void {
    this.username = this.originalUsername; 
    this.isEditing = false;  
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
