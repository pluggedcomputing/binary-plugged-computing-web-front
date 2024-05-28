import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    console.log(`Saving to sessionStorage: ${key} =`, value);
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = sessionStorage.getItem(key);
    console.log(`Loading from sessionStorage: ${key} =`, item);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    console.log(`Removing from sessionStorage: ${key}`);
    sessionStorage.removeItem(key);
  }
}
