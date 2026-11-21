import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.component.css',
  templateUrl: './cart.component.html',
})
export class CartComponent {
   cartDetails: any = null;   // ← هتملاها من الـ API
  isFreeShipping = false;
  shippingCost = 0;

  updateQty(productId: string, count: number): void {}
  removeItem(productId: string): void {}
  clearCart(): void {} 

}
