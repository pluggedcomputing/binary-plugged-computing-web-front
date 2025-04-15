import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BinariosGameService {
  constructor() {}

  saveProgress(
    userResponses: string[], 
    score: number, 
    currentActivity: number, 
    expectedResponse: string, 
    level: number
  ): void {
    const progressKey = `level${level}Progress`; 
    
    const progressData = {
      userResponses: userResponses || [], 
      score: score, 
      currentActivity: currentActivity, 
      expectedResponse: expectedResponse,
    };

    localStorage.setItem(progressKey, JSON.stringify(progressData));
    console.log(`Progresso do Nível ${level} e respostas salvos no localStorage:`, progressData);
  }
  
  getProgress(level: number): any {
    const progressKey = `level${level}Progress`;
    const savedProgress = localStorage.getItem(progressKey);
    console.log(`Progresso do Nível ${level} recuperado do localStorage:`, savedProgress);
    return savedProgress ? JSON.parse(savedProgress) : null;
  }

  clearProgress(): void {
    for (let i = 1; i <= 7; i++) {
      localStorage.removeItem(`level${i}Progress`);  
    }
    
    console.log('Progresso de todos os níveis removido');
  }  

  private calculateScore(userResponses: string[], expectedResponse: string): number {
    let score = 0;

    userResponses.forEach((response) => {
      if (response === expectedResponse) {  
        score++;  
      }
    });

    return score;  
  }   

  addAnswer(userResponses: string[], newAnswer: string): string[] {
    if (!userResponses.includes(newAnswer)) {
      userResponses.push(newAnswer);
    }
    return userResponses; 
  }
}
