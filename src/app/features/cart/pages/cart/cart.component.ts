import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  imports: [RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.component.css',
  templateUrl: './cart.component.html',
})
export class CartComponent  implements OnInit{
 private readonly cartService = inject(CartService)
 cart = signal<Cart | null>(null)
 ngOnInit(): void {
   this.showDataCart()
 }
 showDataCart():void{
  this.cartService.GetLoggedusercart().subscribe({
    next: (res) => {
      console.log(res.data);
      console.log( res.data.products);
      this.cartService.count.set(res.data.products.length);  
      this.cart.set(res.data)
    },
    error: (err) => {
      console.log(err);
    }
  })
 }
clearCart(): void {
  this.cartService.Clearusercart().subscribe({
    next: () => {
      this.cart.set({ products: [], totalCartPrice: 0 } as unknown as Cart);
    },
    error: (err) => console.log(err),
  });
}

removeItem(id: string): void {
  this.cartService.RemovespecificcartItem(id).subscribe({
    next: (res) => {
      this.cart.set(res.data); // الـ API بيرجع الكارت بعد الحذف
    },
    error: (err) => console.log(err),
  });
}

updateQty(id: string, count: number): void {
  if (count < 1) return;
  this.cartService.Updatecartproductquantity(id, count).subscribe({
    next: (res) => this.cart.set(res.data),
    error: (err) => console.log(err),
  });
}
}
