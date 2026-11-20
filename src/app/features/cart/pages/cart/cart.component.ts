import { Component } from '@angular/core';

@Component({
  imports: [],
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
