import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../../../shared/ui/section-title/section-title.component';
import { ShopService } from '../../../../core/services/shop.service';
import { CartStyleComponent } from '../../../../shared/ui/cart-style/cart-style.component';
import { SearchPipe } from '../../../../shared/pipes/search-pipe';
import { SearchService } from '../../../../core/services/search.service';

@Component({
  selector: 'app-product-home',
  imports: [SectionTitleComponent, CommonModule, TranslatePipe, CartStyleComponent, SearchPipe],
  styleUrl: './product-home.component.css',
  templateUrl: './product-home.component.html',
})
export class ProductHomeComponent implements OnInit {
 private readonly shopService = inject(ShopService);
 private readonly searchService = inject(SearchService);

product = signal<ProductShop[]>([]);
currentPage = 1;
numberOfPages = 1;
loading = false;

ngOnInit(): void {
  this.getAlldataProduct();
}

getAlldataProduct(): void {
  if (this.loading || this.currentPage > this.numberOfPages) return;
  this.loading = true;

  this.shopService.getAllProduct(this.currentPage, 20).subscribe({
    next: (res) => {
      this.product.update(old => [...old, ...res.data]);
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
getDiscount(item: ProductShop): number {
    if (!item.priceAfterDiscount) return 0;
    return Math.round(((item.price - item.priceAfterDiscount) / item.price) * 100);
  }

}