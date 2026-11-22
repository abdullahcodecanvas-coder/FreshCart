import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SubCategryService } from '../../../core/services/sub-categry.service';
import { CartStyleComponent } from '../../../shared/ui/cart-style/cart-style.component';

@Component({
  imports: [RouterLink, DatePipe, CartStyleComponent],
  selector: 'app-sub-categry',
  styleUrl: './sub-categry.component.css',
  templateUrl: './sub-categry.component.html',
})
export class SubCategryComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly subCategryService = inject(SubCategryService);

  subCategry = signal<any | null>(null);
  subImage = signal<string>('');
  imageFailed = signal(false);
  products = signal<any[]>([]);
  productsLoaded = signal(false);
  loading = signal(true);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;

      this.loading.set(true);
      this.products.set([]);
      this.productsLoaded.set(false);
      this.subImage.set('');
      this.imageFailed.set(false);

      this.subCategryService.GetspecificSubCategory(id).subscribe({
        next: (res) => {
          this.subCategry.set(res.data);
          this.loading.set(false);
          this.loadCategoryData(res.data.category, id);
        },
        error: (err) => {
          console.log(err);
          this.loading.set(false);
        },
      });
    });
  }

  private loadCategoryData(categoryId: string, subCategoryId: string): void {
    // منتجات الـ category، ونفلتر منها اللي تابع للـ sub category دي
    this.subCategryService.getProductsByCategory(categoryId).subscribe({
      next: (res) => {
        const filtered = res.data.filter((p: any) =>
          p.subcategory?.some((s: any) => s._id === subCategoryId)
        );
        this.products.set(filtered);
        this.productsLoaded.set(true);

        // صورة أول منتج هي صورة الـ sub category، ولو مفيش منتجات بتظهر الأيقونة
        if (filtered.length) {
          this.subImage.set(filtered[0].imageCover);
        } else {
          this.imageFailed.set(true);
        }
      },
      error: (err) => {
        console.log(err);
        this.productsLoaded.set(true);
        this.imageFailed.set(true);
      },
    });
  }
  getDiscount(product: any): number {
  return Math.round((1 - product.priceAfterDiscount / product.price) * 100);
}

getStarType(rating: number, star: number): 'full' | 'half' | 'empty' {
  if (rating >= star) return 'full';
  if (rating >= star - 0.5) return 'half';
  return 'empty';
}
}