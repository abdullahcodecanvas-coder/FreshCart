
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


   isEditing = signal(false);
  isSaving = signal(false);
  profileMsg = signal('');
  profileError = signal('');

  profileForm = this.FB.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^01[0125][0-9]{8}$/)]],
  });

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.profileForm.patchValue({
        name: user.name ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
      });
    } catch {}
    this.profileForm.disable(); // الوضع الافتراضي: مقفول
  }

  toggleEdit() {
    if (this.isEditing()) {
      // Cancel: ارجع للداتا الأصلية
      this.loadUser();
      this.isEditing.set(false);
    } else {
      this.profileForm.enable();
      this.isEditing.set(true);
    }
    this.profileMsg.set('');
    this.profileError.set('');
  }

  onSaveProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const { name, email, phone } = this.profileForm.value;
    const body: any = { name, email };
    if (phone) body.phone = phone; // ما تبعتش phone فاضي

    this.isSaving.set(true);
    this.profileMsg.set('');
    this.profileError.set('');

    this.profileService.UpdateMe(body).subscribe({
      next: (res: any) => {
        const old = JSON.parse(localStorage.getItem('user') || '{}');
        const updated = { ...old, ...(res.user ?? body) };
        localStorage.setItem('user', JSON.stringify(updated));

        this.profileMsg.set('Profile updated successfully');
        this.profileForm.disable();
        this.isEditing.set(false);
        this.isSaving.set(false);
      },
      error: (err) => {
        this.profileError.set(err.error?.errors?.msg || err.error?.message || 'Something went wrong');
        this.isSaving.set(false);
      },
    });
  }

}
