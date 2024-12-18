import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BinariosGameService {
  constructor() {}

  // Salva o progresso no localStorage (somente respostas e score)
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
      userResponses: userResponses || [], // Salvando as respostas do usuário
      score: score, // Salvando o score
      challengeState: challengeState, // Salvando o estado do desafio
      currentActivity: currentActivity, // Salvando a atividade atual
      expectedResponse: expectedResponse // Salvando a resposta esperada
    };
  
    // Usando chaves diferentes para os níveis
    localStorage.setItem(progressKey, JSON.stringify(progressData));
    console.log('Progresso e respostas salvos no localStorage:', progressData);
  }  

  // Recupera o progresso do localStorage
  getProgress(level: number): any {
    // Alterar a chave com base no nível
    const progressKey = level === 1 ? 'level1Progress' : 'level2Progress';
    const savedProgress = localStorage.getItem(progressKey);
    console.log('Progresso recuperado do localStorage:', savedProgress);
    return savedProgress ? JSON.parse(savedProgress) : null;
  }

  // Limpa o progresso do localStorage
  clearProgress(): void {
    localStorage.removeItem('level1Progress');
    localStorage.removeItem('level2Progress');
    // Adicione outros níveis conforme necessário
    console.log('Progresso de todos os níveis removido');
  }  

  // Função para calcular o score com base nas respostas corretas
  private calculateScore(userResponses: string[], expectedResponse: string): number {
    let score = 0;
  
    userResponses.forEach((response) => {
      if (response === expectedResponse) {  // Comparando com a resposta esperada passada como argumento
        score++;  // Incrementa o score por resposta correta
      }
    });
  
    return score;  // Retorna o score calculado
  }   
  
  // Verifica se a resposta já foi dada, para evitar salvar respostas adicionais no mesmo desafio
  addAnswer(userResponses: string[], newAnswer: string): string[] {
    // Adiciona a nova resposta, se ela não existir no array de respostas
    if (!userResponses.includes(newAnswer)) {
      userResponses.push(newAnswer);
    }
    return userResponses; // Retorna o array de respostas atualizado
  }
}
