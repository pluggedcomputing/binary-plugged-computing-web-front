import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  show(
    textOrTpl: string | TemplateRef<any>,
    type: 'success' | 'error' = 'success', 
    options: any = {}
  ) {
    this.toasts.push({ textOrTpl, type, ...options });

    setTimeout(() => this.remove({ textOrTpl, type, ...options }), 3000);
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts = [];
  }
}
