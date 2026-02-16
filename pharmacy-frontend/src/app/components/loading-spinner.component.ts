import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center p-8">
      <div class="relative">
        <div class="w-12 h-12 rounded-full border-4 border-gray-300"></div>
        <div class="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-primary-600 animate-spin"></div>
      </div>
      <span class="ml-4 text-gray-600 font-medium">Loading...</span>
    </div>
  `,
})
export class LoadingSpinnerComponent {}
