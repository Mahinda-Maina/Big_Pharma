import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="alertClass" role="alert">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <ng-container [ngSwitch]="type">
            <span *ngSwitchCase="'success'" class="text-2xl">✓</span>
            <span *ngSwitchCase="'error'" class="text-2xl">✕</span>
            <span *ngSwitchCase="'warning'" class="text-2xl">⚠</span>
            <span *ngSwitchCase="'info'" class="text-2xl">ℹ</span>
          </ng-container>
        </div>
        <div class="ml-3 flex-1">
          <h3 *ngIf="title" class="font-semibold" [class]="titleClass">
            {{ title }}
          </h3>
          <div [class]="messageClass">
            {{ message }}
          </div>
        </div>
        <button
          *ngIf="dismissible"
          (click)="onDismiss.emit()"
          class="ml-2 text-lg font-bold opacity-70 hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  `,
})
export class AlertComponent {
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() message: string = '';
  @Input() title?: string;
  @Input() dismissible = true;
  @Output() onDismiss = new EventEmitter<void>();

  get alertClass(): string {
    const baseClass = 'p-4 rounded-lg border';
    const typeClasses = {
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
    };
    return `${baseClass} ${typeClasses[this.type]}`;
  }

  get titleClass(): string {
    const typeClasses = {
      success: 'text-green-900',
      error: 'text-red-900',
      warning: 'text-yellow-900',
      info: 'text-blue-900',
    };
    return typeClasses[this.type];
  }

  get messageClass(): string {
    const typeClasses = {
      success: 'text-green-700 mt-1',
      error: 'text-red-700 mt-1',
      warning: 'text-yellow-700 mt-1',
      info: 'text-blue-700 mt-1',
    };
    return typeClasses[this.type];
  }
}
