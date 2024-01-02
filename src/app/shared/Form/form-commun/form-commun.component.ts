import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-commun',
  templateUrl: './form-commun.component.html',
  styleUrls: ['./form-commun.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormCommunComponent),
      multi: true
    }
  ],
})
export class FormCommunComponent implements ControlValueAccessor {

  @Input() label!: string;
  @Input() labelFor!: string;

  @Input() inputName!: string;
  @Input() inputId!: string;
  @Input() formControlName!: string;
  @Input() placeholder!: string;
  @Input() isRequired = false;
  @Input() max?: number;
  @Input() min?: number;
  @Input() selectOptions?: any[] = [];

  @Input() inputType: string | 'select' = 'text';



  @Input() formGroup!: FormGroup;



  private innerValue: any = '';
  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  writeValue(value: any): void {
    this.innerValue = value;
    this.onChangeCallback(value);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.onTouchedCallback();
  }

  handleChange(event: any): void {
    this.innerValue = event.target.value;
    this.onChangeCallback(this.innerValue);
  }


}
