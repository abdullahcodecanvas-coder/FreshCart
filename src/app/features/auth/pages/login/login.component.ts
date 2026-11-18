import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';

@Component({
  imports: [TranslatePipe, RouterLink, ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly FB = inject(FormBuilder);
  private readonly registerService = inject(RegisterService);
  private readonly router = inject(Router);

  showPassword = signal(false);
  isLoading = signal(false);
  errorMsg = signal('');

  loginForm = this.FB.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  isInvalid(name: string): boolean {
    const c = this.loginForm.get(name);
    return !!c && (c.touched || c.dirty) && c.invalid;
  }

  isValid(name: string): boolean {
    const c = this.loginForm.get(name);
    return !!c && (c.touched || c.dirty) && c.valid;
  }

  inputClass(name: string, paddingEnd: string): string {
    const base = `w-full bg-gray-50 border-2 rounded-xl py-3 ps-11 ${paddingEnd} font-regular text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition`;
    if (this.isInvalid(name)) return `${base} border-red-500 focus:border-red-500 focus:ring-red-200`;
    if (this.isValid(name)) return `${base} border-green-500 focus:border-green-500 focus:ring-green-200`;
    return `${base} border-gray-200 focus:border-green-500 focus:ring-green-200`;
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  submitForm(): void {
    this.errorMsg.set('');
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { rememberMe, ...body } = this.loginForm.value;
    this.isLoading.set(true);

    this.registerService.Signin(body).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.message === 'success') {
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem('token', res.token);
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMsg.set(err.error?.message || 'login.errors.failed');
      },
    });
  }
}