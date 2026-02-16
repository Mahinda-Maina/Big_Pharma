import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="w-full">
      <label *ngIf="label" class="block text-sm font-medium text-gray-700 mb-2">
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>
      <input
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()"
        [class]="inputClass"
        [class.border-red-500]="error"
      />
      <p *ngIf="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
    </div>
  `,
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() error: string = '';
  @Input() disabled = false;
  @Input() required = false;
  @Output() valueChange = new EventEmitter<string>();

  value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  get inputClass(): string {
    return `w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition ${
      this.error ? 'border-red-500' : ''
    } ${this.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`;
  }

  onInput(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
