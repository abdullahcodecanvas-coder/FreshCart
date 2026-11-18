import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  imports: [RouterLink,TranslatePipe,ReactiveFormsModule],
  selector: 'app-forgetpassword',
  styleUrl: './forgetpassword.component.css',
  templateUrl: './forgetpassword.component.html',
})
export class ForgetpasswordComponent {
 private readonly registerService = inject(RegisterService)
 private readonly router = inject(Router)
 step = signal<1 | 2 | 3>(1);
 email = new FormControl("" ,[Validators.required, Validators.email])
 code =  new FormControl('',[Validators.required])
 newPassword = new FormControl ('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)])

  submitEmail(e:SubmitEvent):void {
    e.preventDefault();
   if(this.email.valid){
    const data ={
      email : this.email.value
    }
    this.registerService.forgotPasswords(data).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.statusMsg === 'success'){
       this.step.set(2);
      }
    }
    })
   }
  }

  submitCode(e:SubmitEvent):void {
    e.preventDefault();
    if(this.code.valid){
    const data ={
      resetCode : this.code.value
    }
        this.registerService.verifyResetCode(data).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.status === 'Success'){
       this.step.set(3);
      }
    }
    })
   }
  }

 submitPassword(e: SubmitEvent): void {
  e.preventDefault();
  if (this.newPassword.valid && this.confirmPassword.valid && this.passwordsMatch) {
    const data = {
      email: this.email.value,
      newPassword: this.newPassword.value
    };
    this.registerService.resetPassword(data).subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
      }
    });
  }
}

  resendCode(): void {
  if (this.email.valid) {
    const data = {
      email: this.email.value
    };
    this.registerService.forgotPasswords(data).subscribe({
      next: (res) => {
        console.log(res);
        this.code.reset();
      }
    });
  }
}
BackStep():void{
   this.step.set(1);
}
showNewPassword = signal<boolean>(false);
showConfirmPassword = signal<boolean>(false);

confirmPassword = new FormControl('', [Validators.required]);

get passwordsMatch(): boolean {
  return this.newPassword.value === this.confirmPassword.value;
}
}
