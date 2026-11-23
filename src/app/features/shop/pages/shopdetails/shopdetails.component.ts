import { Component, computed, HostListener, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ShopService } from '../../../../core/services/shop.service';
import { CartStyleComponent } from '../../../../shared/ui/cart-style/cart-style.component';
import { SectionTitleComponent } from '../../../../shared/ui/section-title/section-title.component';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from '@relynn/ngx-toastr';
import { WishlistService } from '../../../wishlist/services/wishlist.service';

@Component({
  selector: 'app-shopdetails',
  imports: [RouterLink, DecimalPipe, CartStyleComponent, SectionTitleComponent, TranslatePipe],
  templateUrl: './shopdetails.component.html',
  styleUrl: './shopdetails.component.css',
})
export class ShopdetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly shopService = inject(ShopService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  idProductNow = signal<string>('');
  product = signal<ProductShop>({} as ProductShop);
  selectedImage = signal<string>('');
  quantity = signal<number>(1);
  activeTab = signal<'details' | 'reviews' | 'shipping'>('details');
  isWishlisted = signal<boolean>(false);
  isAdded = signal<boolean>(false);

  // ===== Infinite scroll =====
  allProducts = signal<ProductShop[]>([]);
  currentPage = 1;
  numberOfPages = 1;
  loading = false;

  stars = [1, 2, 3, 4, 5];
  totalPrice = computed(() => (this.product().price ?? 0) * this.quantity());
  roundedRating = computed(() => Math.round(this.product().ratingsAverage ?? 0));

  otherProducts = computed(() =>
    this.allProducts().filter((p) => p._id !== this.idProductNow())
  );

  ngOnInit(): void {
    this.getId();
    this.getAlldataProduct();
  }

  getId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idProductNow.set(params.get('id')!);
      this.quantity.set(1);

      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      this.getProuctDetails();
    });
  }

  getProuctDetails(): void {
    this.shopService.getSignalSpecifiProduct(this.idProductNow()).subscribe({
      next: (res) => {
        this.product.set(res.data);
        this.selectedImage.set(res.data.imageCover);
      },
    });
  }

  getAlldataProduct(): void {
    if (this.loading || this.currentPage > this.numberOfPages) return;
    this.loading = true;

    this.shopService.getAllProduct(this.currentPage, 20).subscribe({
      next: (res) => {
        this.allProducts.update((old) => [...old, ...res.data]);
        this.numberOfPages = res.metadata.numberOfPages;
        this.currentPage++;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
    if (nearBottom) this.getAlldataProduct();
  }

  selectImage(img: string): void {
    this.selectedImage.set(img);
  }

  increase(): void {
    if (this.quantity() < (this.product().quantity ?? 1)) {
      this.quantity.update((q) => q + 1);
    }
  }

  decrease(): void {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }

  addToCart(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (!localStorage.getItem('token')) {
      this.toastr.warning('لازم تسجل دخول الأول عشان تضيف منتجات للسلة');
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.AddProductToCart(this.idProductNow()).subscribe({
      next: (res) => {
        if (res.status === 'success') {
    
          this.isAdded.set(true);
          setTimeout(() => this.isAdded.set(false), 2000);
        }
      },
      error: (err) => {
        console.error(err);
       
      },
    });
  }

  isWishlistLoading = signal<boolean>(false);
private readonly wishlistService = inject(WishlistService);
toggleWishlist(): void {
  if (!isPlatformBrowser(this.platformId)) return;

  if (!localStorage.getItem('token')) {
    this.toastr.warning('لازم تسجل دخول الأول عشان تضيف منتجات للمفضلة');
    this.router.navigate(['/login']);
    return;
  }

  if (this.isWishlistLoading()) return;
  this.isWishlistLoading.set(true);

  const id = this.idProductNow();

  if (this.isWishlisted()) {
    this.wishlistService.Removeproductfromwishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.isWishlisted.set(false);
          this.toastr.info('تم الحذف من المفضلة');
        }
        this.isWishlistLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('حصل خطأ، حاول تاني');
        this.isWishlistLoading.set(false);
      },
    });
  } else {
    this.wishlistService.Addproducttowishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.isWishlisted.set(true);
        }
        this.isWishlistLoading.set(false);
      },
      error: (err) => {
        console.error(err);
      
        this.isWishlistLoading.set(false);
      },
    });
  }
}
 isBuying = signal<boolean>(false);

buyNow(): void {
  if (!isPlatformBrowser(this.platformId)) return;

  if (!localStorage.getItem('token')) {
    this.toastr.warning('لازم تسجل دخول الأول عشان تكمل الشراء');
    this.router.navigate(['/login']);
    return;
  }

  if (this.isBuying()) return;
  this.isBuying.set(true);

  this.cartService.AddProductToCart(this.idProductNow()).subscribe({
    next: (res) => {
      if (res.status === 'success') {
        this.router.navigate(['/cart']);
      }
      this.isBuying.set(false);
    },
    error: (err) => {
      console.error(err);
  
      this.isBuying.set(false);
    },
  });
}
}