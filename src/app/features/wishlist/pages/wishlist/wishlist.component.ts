import { Component, inject, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  imports: [RouterLink, DecimalPipe],
  selector: 'app-wishlist',
  styleUrl: './wishlist.component.css',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);

  products = signal<Wishlist[]>([]);

  ngOnInit(): void {
    this.showAllWishlist();
  }

  showAllWishlist(): void {
    if (localStorage.getItem('token')) {
      this.wishlistService.Getloggeduserwishlist().subscribe({
        next: (res) => {
          this.products.set(res.data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  delete(id: string): void {
    if (localStorage.getItem('token')) {
      this.wishlistService.Removeproductfromwishlist(id).subscribe({
        next: () => {
          this.products.update((list) => list.filter((p) => p._id !== id));
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  addToCart(id: string): void {
    this.cartService.AddProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        
        this.router.navigate(['/cart']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}