import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
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
  getStarType(star: number): 'full' | 'half' | 'empty' {
  const rating = this.item().ratingsAverage;
  if (rating >= star) return 'full';
  if (rating >= star - 0.5) return 'half';
  return 'empty';
}
}
