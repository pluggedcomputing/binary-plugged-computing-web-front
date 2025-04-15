import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-screen-four-level-one',
  templateUrl: './screen-four-level-one.component.html',
  styleUrls: ['./screen-four-level-one.component.css']
})
export class ScreenFourLevelOneComponent implements OnInit {
  score: number = 0;
  starsArray: number[] = [];  
  emptyStarsArray: number[] = [];  
  congratulations_message: string = ''; 

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['score']) {
        this.score = params['score'];
        this.updateStars();  
        this.updateCongratulationsMessage(); 
      }
    });
  }

  updateStars(): void {
    const maxStars = 5;  
    this.starsArray = Array(Math.round(this.score));  
    this.emptyStarsArray = Array(maxStars - this.starsArray.length);  
  }

  updateCongratulationsMessage(): void {
    const starsCount = this.starsArray.length;
  
    if (starsCount === 5) {
      this.congratulations_message = 'Pontuação máxima alcançada! Excelente trabalho!';
    } else if (starsCount === 4) {
      this.congratulations_message = 'Muito bem! Quase lá!';
    } else if (starsCount === 3) {
      this.congratulations_message = 'Bom esforço! Continue praticando!';
    } else if (starsCount === 2) {
      this.congratulations_message = 'Ainda dá para melhorar! Não desista!';
    } else {
      this.congratulations_message = 'Continue tentando! Cada erro é uma oportunidade de aprendizado!';
    }
  }  
  
  resetProgress(): void {
    localStorage.removeItem('level1Progress');
    this.router.navigate(['/fase-1-1']);
  }  

  goToNextLevel(): void {
    this.router.navigate(['/fase-2-1']);
  }
}
