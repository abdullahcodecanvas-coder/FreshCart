import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  imports: [TranslatePipe, RouterLink, ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.component.css',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly FB = inject(FormBuilder);
registerForm = this.FB.group(
  {
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)]],
    rePassword: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    terms: [false, [Validators.requiredTrue]],
  },
  { validators: [this.confirmPassword] }
);

confirmPassword(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const rePassword = group.get('rePassword')?.value;
  return password === rePassword ? null : { mismatch: true };
}

isInvalid(name: string): boolean {
  const c = this.registerForm.get(name);
  if (!c || !(c.touched || c.dirty)) return false;
  if (name === 'rePassword') return c.invalid || this.registerForm.hasError('mismatch');
  return c.invalid;
}

isValid(name: string): boolean {
  const c = this.registerForm.get(name);
  if (!c || !(c.touched || c.dirty)) return false;
  if (name === 'rePassword') return c.valid && !this.registerForm.hasError('mismatch');
  return c.valid;
}

inputClass(name: string): string {
  const base =
    'w-full border rounded-md ps-3 pe-10 py-2 font-regular text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition';
  if (this.isInvalid(name)) return `${base} border-red-500 focus:border-red-500 focus:ring-red-200`;
  if (this.isValid(name)) return `${base} border-green-500 focus:border-green-500 focus:ring-green-200`;
  return `${base} border-gray-300 focus:border-green-500 focus:ring-green-200`;
}

sumbitForm(): void {
  if (this.registerForm.valid) {
    const { terms, ...body } = this.registerForm.value;
    console.log(body); // { name, email, password, rePassword, phone }
  } else {
    this.registerForm.markAllAsTouched();
  }
}
}