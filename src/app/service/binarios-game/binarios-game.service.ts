import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BinariosGameService {
  constructor() {}

  saveProgress(
    userResponses: string[], 
    score: number, 
    challengeState: any, 
    currentActivity: number, 
    expectedResponse: string, 
    level: number
  ): void {
    const progressKey = level === 1 ? 'level1Progress' : 'level2Progress';
  
    const progressData = {
      userResponses: userResponses || [], 
      score: score, 
      challengeState: challengeState, 
      currentActivity: currentActivity, 
      expectedResponse: expectedResponse 
    };
  
    
    localStorage.setItem(progressKey, JSON.stringify(progressData));
    console.log('Progresso e respostas salvos no localStorage:', progressData);
  }  

  
  getProgress(level: number): any {
    
    const progressKey = level === 1 ? 'level1Progress' : 'level2Progress';
    const savedProgress = localStorage.getItem(progressKey);
    console.log('Progresso recuperado do localStorage:', savedProgress);
    return savedProgress ? JSON.parse(savedProgress) : null;
  }

  
  clearProgress(): void {
    localStorage.removeItem('level1Progress');
    localStorage.removeItem('level2Progress');
    
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