import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [attr.type]="type"
      [class]="buttonClass"
      [disabled]="disabled"
      (click)="onClick.emit()"
    >
      <span *ngIf="loading" class="inline-block mr-2">
        <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </span>
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Output() onClick = new EventEmitter<void>();

  get buttonClass(): string {
    const baseClass = 'font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center';

    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-gray-400',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-300',
      danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400',
      ghost: 'bg-transparent text-primary-600 hover:bg-primary-50 disabled:text-gray-400',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return `${baseClass} ${variants[this.variant]} ${sizes[this.size]} ${this.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`;
  }
}
