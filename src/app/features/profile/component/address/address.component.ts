import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';


@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-address',
  styleUrl: './address.component.css',
  templateUrl: './address.component.html',
})
export class AddressComponent implements OnInit {
  private readonly profileService = inject(ProfileService)
  private readonly FB = inject(FormBuilder)

  isAddressExist = computed(() => this.address().length >= 1);
  ngOnInit(): void {
    this.showAddress()
  }
  addressForm = this.FB.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    details: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: ['', [Validators.required]],
  });
 
submitForm(dialog: HTMLDialogElement): void {
  
  if (this.addressForm.invalid) {
    this.addressForm.markAllAsTouched();
    return;
  }
  //      this.profileService.AddAddress(this.addressForm.getRawValue()).subscribe({
  //   next: (res) => {
  //      if(res.status ==='success' ){
  //        console.log( res);
  //     this.addressForm.reset();
  //     dialog.close();
  //     }
  //   },
  //   error: (err) => {
  //     console.log( err);
  //   },
  // });

    const id = this.editingId();
    const data = this.addressForm.getRawValue();

    // Edit = حذف القديم ثم إضافة الجديد (الـ API غالبًا مفيهوش PUT)
    const request$ = id
      ? this.profileService
          .RemoveAddress(id)
          .pipe(switchMap(() => this.profileService.AddAddress(data)))
      : this.profileService.AddAddress(data);

    request$.subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.addressForm.reset();
          this.editingId.set(null);
          dialog.close();
          this.showAddress();
        }
      },
      error: (err) => console.log(err),
    });
}
address = signal<Address[]>([])
 showAddress():void{
  
  this.profileService.GetLoggedUserAddresses().subscribe({
    next: (res) => {
      console.log(res.data);
      this.address.set(res.data)
    },
    error: (err) => {
      console.log(err);
    }
  })
 }

delete(id: string): void {
 
    this.profileService.RemoveAddress(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          console.log('Address Deleted:', res);
          this.address.update((addresses) =>
            addresses.filter((address) => address._id !== id)
          );
        }
      },
      error: (err) => {
        console.log('Delete Error:', err);
      },
    });
}


editingId = signal<string | null>(null);

openAdd(dialog: HTMLDialogElement): void {
  this.editingId.set(null);
  this.addressForm.reset();
  dialog.showModal();
}

openEdit(item: Address, dialog: HTMLDialogElement): void {
  this.editingId.set(item._id);
  this.addressForm.patchValue({
    name: item.name,
    details: item.details,
    phone: item.phone,
    city: item.city,
  });
  dialog.showModal();
}

}
