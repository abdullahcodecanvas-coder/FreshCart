
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-setting',
  styleUrl: './setting.component.css',
  templateUrl: './setting.component.html',
})
export class SettingComponent {
  private readonly profileService = inject(ProfileService);
  private readonly FB = inject(FormBuilder);
    isLoading = signal(false);
  errorMsg = signal('');
  successMsg = signal('');

  showCurrent = signal(false);
  showNew = signal(false);
  showConfirm = signal(false);
   passwordForm = this.FB.group(
    {
      currentPassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]],
    },
    { validators: [this.matchPasswords] }
  );
  matchPasswords(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const rePass = group.get('rePassword')?.value;
    return pass === rePass ? null : { mismatch: true };
  }
  onChangePassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMsg.set('');
    this.successMsg.set('');

    this.profileService.changePassword(this.passwordForm.value).subscribe({
      next: (res: any) => {
        if (res.token) localStorage.setItem('userToken', res.token);
        this.successMsg.set('Password changed successfully');
        this.passwordForm.reset();
        this.isLoading.set(false);
      },
     error: (err) => {
        this.errorMsg.set(err.error?.message || 'Something went wrong');
        this.isLoading.set(false);
      },
    });
  }
}
