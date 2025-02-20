import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  username: string = '';  
  userID: string = '';    
  isEditing: boolean = false;  
  originalUsername: string = '';  

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const currentRoute = this.router.url;
  
    if (currentRoute.includes('/settings/edit')) {
      this.isEditing = true;  
    } else {
      this.isEditing = false; 
    }
  
    this.userID = sessionStorage.getItem('userID') || '';
  
    if (this.userID !== 'Anonymous') {
      const savedUsername = localStorage.getItem('userID');
      
      if (savedUsername) {
        this.username = savedUsername;  
        this.originalUsername = savedUsername;  
      }
    }
  }  

  saveUsername(): void {
    if (this.username.trim() && this.username !== this.originalUsername) {
      localStorage.setItem('userID', this.username);  
      sessionStorage.setItem('userID', this.username);  
  
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
    this.router.navigate(['/settings']);  
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

  goToSettings(): void {
    this.router.navigate(['/settings']);  
  }

  goToEditUser(): void {
    this.router.navigate(['/settings/edit']);
    this.isEditing = true;    
  } 
}
