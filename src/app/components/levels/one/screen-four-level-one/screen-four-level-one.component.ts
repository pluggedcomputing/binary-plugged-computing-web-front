import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-screen-four-level-one',
  templateUrl: './screen-four-level-one.component.html',
  styleUrls: ['./screen-four-level-one.component.css']
})
export class ScreenFourLevelOneComponent implements OnInit {
  score: number = 0;
  starsArray: number[] = [];  
  emptyStarsArray: number[] = [];  

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      if (params['score']) {
        this.score = params['score'];
        this.updateStars();  
      }
    });
  }

  
  updateStars(): void {
    const maxStars = 5;  
    this.starsArray = Array(Math.round(this.score));  
    this.emptyStarsArray = Array(maxStars - this.starsArray.length);  
  }
}
