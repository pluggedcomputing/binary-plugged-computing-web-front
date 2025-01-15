import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { BinariosGameService } from 'src/app/service/binarios-game/binarios-game.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  constructor(
    private router: Router, 
    private binariosGameService: BinariosGameService
  ) { }

  
  clearProgress(): void {
    const confirmClear = confirm('Tem certeza de que deseja apagar todos os dados?');
    if (confirmClear) {
      this.binariosGameService.clearProgress(); 
      alert('Todos os dados foram apagados!');
      this.navigateToLevels();  
    }
  }  

 
  navigateToLevels(): void {
    this.router.navigate(['/fases']); 
  }
}
