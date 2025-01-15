import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level-selection',
  templateUrl: './level-selection.component.html',
  styleUrls: ['./level-selection.component.css']
})
export class LevelSelectionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  
  goToSettings(): void {
    this.router.navigate(['/settings']);  
  }
}
