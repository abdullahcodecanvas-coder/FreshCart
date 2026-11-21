import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CheckService } from '../../services/check.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../cart/services/cart.service';
import { DecimalPipe } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule ,DecimalPipe ],
  selector: 'app-check-out',
  styleUrl: './check-out.component.css',
  templateUrl: './check-out.component.html',
})
export class CheckOutComponent implements OnInit {
  private readonly checkService = inject(CheckService);
  private readonly fb = inject(FormBuilder);
      private readonly cartService = inject(CartService)
    cart = signal<Cart | null>(null)
  id = input<string>();
  flag = signal('cash')

  checkoutForm = this.fb.group({
    shippingAddress: this.fb.group({
      details: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
    }),
  });

  ngOnInit(): void {
    console.log(this.id());
     this.showDataCart()
  }

  get shipping() {
    return this.checkoutForm.controls.shippingAddress;
  }

  hasError(name: 'details' | 'phone' | 'city'): boolean {
    const c = this.shipping.controls[name];
    return c.invalid && c.touched;
  }

  submit(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
   else{
     if(this.flag() === 'cash'){
     console.log('cash')
    this.checkService.CreateCashOrder(this.id()! , this.checkoutForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status === "success" ){

        }
      },
      error: (err) => {
        console.log(err);
      }
    })
    } else{
     this.checkService.Checkoutsession(this.id()! , this.checkoutForm.value).subscribe({
       next: (res) => {
         console.log(res);
         window.open(res.session.url , '_self')
       },
       error: (err) => {
         console.log(err);
       }
     })
    }
  }

   }

    showDataCart():void{
     this.cartService.GetLoggedusercart().subscribe({
       next: (res) => {
         console.log(res.data);
         this.cart.set(res.data)
       },
       error: (err) => {
         console.log(err);
       }
     })
    }

}