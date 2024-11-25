import { Component, TemplateRef } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [ngStyle]="{ 'background-color': toast.type === 'success' ? '#4caf50' : '#f44336', 'color': 'white' }"
      [autohide]="true"
      [delay]="toast.delay || 3000"
      (hidden)="toastService.remove(toast)">
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>
      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: {
    class: 'toast-container',
    style: 'position: fixed; top: 10px; right: 10px; z-index: 1200;',
  },
})
export class ToastContainer {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
