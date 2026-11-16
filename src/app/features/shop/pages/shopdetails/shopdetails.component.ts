import { Component, computed, HostListener, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ShopService } from '../../../../core/services/shop.service';
import { CartStyleComponent } from '../../../../shared/ui/cart-style/cart-style.component';
import { SectionTitleComponent } from '../../../../shared/ui/section-title/section-title.component';


@Component({
  selector: 'app-shopdetails',
  imports: [RouterLink, DecimalPipe, CartStyleComponent, SectionTitleComponent, TranslatePipe],
  templateUrl: './shopdetails.component.html',
  styleUrl: './shopdetails.component.css',
})
export class ShopdetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly shopService = inject(ShopService);

  private readonly platformId = inject(PLATFORM_ID);

  idProductNow = signal<string>('');
  product = signal<ProductShop>({} as ProductShop);
  selectedImage = signal<string>('');
  quantity = signal<number>(1);
  activeTab = signal<'details' | 'reviews' | 'shipping'>('details');
  isWishlisted = signal<boolean>(false);

  // ===== Infinite scroll =====
  allProducts = signal<ProductShop[]>([]);
  currentPage = 1;
  numberOfPages = 1;
  loading = false;

  stars = [1, 2, 3, 4, 5];
  totalPrice = computed(() => (this.product().price ?? 0) * this.quantity());
  roundedRating = computed(() => Math.round(this.product().ratingsAverage ?? 0));

  // يستبعد المنتج الحالي (من غير slice عشان الـ scroll يكمّل)
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

  toggleWishlist(): void {
    this.isWishlisted.update((v) => !v);
  }

  addToCart(): void {}

  buyNow(): void {}
}