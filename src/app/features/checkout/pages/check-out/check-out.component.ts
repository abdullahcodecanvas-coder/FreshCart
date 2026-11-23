import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CheckService } from '../../services/check.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../cart/services/cart.service';
import { ProfileService } from '../../../profile/services/profile.service';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [ReactiveFormsModule, DecimalPipe , TranslatePipe],
  selector: 'app-check-out',
  styleUrl: './check-out.component.css',
  templateUrl: './check-out.component.html',
})
export class CheckOutComponent implements OnInit {
  private readonly checkService = inject(CheckService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly profileService = inject(ProfileService);

  id = input<string>();
  cart = signal<Cart | null>(null);
  flag = signal('cash');

  addresses = signal<SavedAddress[]>([]);
  selectedAddressId = signal<string | null>(null);

  checkoutForm = this.fb.group({
    shippingAddress: this.fb.group({
      details: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
    }),
  });

  ngOnInit(): void {
    this.showDataCart();
    this.loadAddresses();
  }

  get shipping() {
    return this.checkoutForm.controls.shippingAddress;
  }

  hasError(name: 'details' | 'phone' | 'city'): boolean {
    const c = this.shipping.controls[name];
    return c.invalid && c.touched;
  }

  loadAddresses(): void {
    this.profileService.GetLoggedUserAddresses().subscribe({
      next: (res) => this.addresses.set(res.data ?? []),
      error: (err) => console.log(err),
    });
  }

  useAddress(address: SavedAddress): void {
    this.shipping.patchValue({
      details: address.details,
      phone: address.phone,
      city: address.city,
    });
    this.selectedAddressId.set(address._id);
  }

  clearAddress(): void {
    this.shipping.reset();
    this.selectedAddressId.set(null);
  }

  submit(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    if (this.flag() === 'cash') {
      this.checkService.CreateCashOrder(this.id()!, this.checkoutForm.value).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.router.navigate(['/allorders']);
          }
        },
        error: (err) => console.log(err),
      });
    } else {
      this.checkService.Checkoutsession(this.id()!, this.checkoutForm.value).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            window.open(res.session.url, '_self');
          }
        },
        error: (err) => console.log(err),
      });
    }
  }

  showDataCart(): void {
    this.cartService.GetLoggedusercart().subscribe({
      next: (res) => this.cart.set(res.data),
      error: (err) => console.log(err),
    });
  }
}