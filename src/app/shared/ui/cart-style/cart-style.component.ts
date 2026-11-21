import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from '@relynn/ngx-toastr';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';

@Component({
  imports: [RouterLink ],
  selector: 'app-cart-style',
  styleUrl: './cart-style.component.css',
  templateUrl: './cart-style.component.html',
})
export class CartStyleComponent {
  item  = input.required<ProductShop>();
  private readonly cartService= inject(CartService)
  private toastr = inject(ToastrService);
private router = inject(Router);
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


addedIds = signal<Set<string>>(new Set());

callApiToAdd(id: string) {
if(localStorage.getItem('token')){
    this.cartService.AddProductToCart(id).subscribe({
    next: (res) => {
      if (res.status === 'success') {
        this.addedIds.update(set => new Set(set).add(id));

        setTimeout(() => {
          this.addedIds.update(set => {
            const next = new Set(set);
            next.delete(id);
            return next;
          });
        }, 2000);
      }
    },
    error: (err) => console.error(err),
  });
}else{
 this.toastr.warning('لازم تسجل دخول الأول عشان تضيف منتجات للسلة');
    this.router.navigate(['/login']);
    return;
}
}
private readonly wishlistService = inject(WishlistService)
 addHeart(id:string):void{
  if(localStorage.getItem('token')){
    this.wishlistService.Addproducttowishlist(id).subscribe({
    next: (res) => {
      if (res.status === 'success') {
        this.addedIds.update(set => new Set(set).add(id));

        setTimeout(() => {
          this.addedIds.update(set => {
            const next = new Set(set);
            next.delete(id);
            return next;
          });
        }, 2000);
      }
    },
    error: (err) => console.error(err),
  });
}else{
 this.toastr.warning('لازم تسجل دخول الأول عشان تضيف منتجات للسلة');
    this.router.navigate(['/login']);
    return;
}}
}

