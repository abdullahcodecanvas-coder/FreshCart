import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ShopService } from '../../../../core/services/shop.service';
import { CartStyleComponent } from '../../../../shared/ui/cart-style/cart-style.component';

@Component({
  imports: [TranslatePipe, RouterLink, CartStyleComponent],
  selector: 'app-shop',
  styleUrl: './shop.component.css',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly shopService = inject(ShopService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly limit = 12;

  products = signal<ProductShop[]>([]);
  loading = signal<boolean>(true);
  currentPage = signal<number>(1);
  numberOfPages = signal<number>(1);
  subcategoryId = signal<string>('');

  pages = computed(() =>
    Array.from({ length: this.numberOfPages() }, (_, i) => i + 1)
  );

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.subcategoryId.set(params.get('subcategory') ?? '');
      this.currentPage.set(Number(params.get('page')) || 1);
      this.getProducts();
    });
  }

  getProducts(): void {
    this.loading.set(true);

    this.shopService.getFilteredProducts(this.currentPage(), this.limit, this.subcategoryId())
      .subscribe({
        next: (res) => {
          this.products.set(res.data);
          this.numberOfPages.set(res.metadata?.numberOfPages ?? 1);
          this.loading.set(false);

          if (isPlatformBrowser(this.platformId)) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        },
        error: () => this.loading.set(false),
      });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.numberOfPages() || page === this.currentPage()) return;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  clearFilter(): void {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: {} });
  }
headerTitle = signal<string>('Shop');
headerSubtitle = signal<string>('Explore our products');
  getHeaderData(): void {
  const id = this.subcategoryId();

  if (!id) {
    this.headerTitle.set('Shop');
    this.headerSubtitle.set('Explore our products');
    return;
  }

  this.shopService.getSubcategoryById(id).subscribe({
    next: (res) => {
      this.headerTitle.set(res.data.name);
      this.headerSubtitle.set(res.data.description ?? '');
    },
  });
}
}