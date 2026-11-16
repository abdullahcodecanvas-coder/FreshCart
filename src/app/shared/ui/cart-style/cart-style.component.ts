import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-cart-style',
  styleUrl: './cart-style.component.css',
  templateUrl: './cart-style.component.html',
})
export class CartStyleComponent {
  item  = input.required<ProductShop>();
  getDiscount(): number {
    const p = this.item();
    if (!p.priceAfterDiscount) return 0;
    return Math.round(((p.price - p.priceAfterDiscount) / p.price) * 100);
  }
}
