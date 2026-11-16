import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../../../../core/services/categry.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe, RouterLink],
  selector: 'app-categoriesdetails',
  styleUrl: './categoriesdetails.component.css',
  templateUrl: './categoriesdetails.component.html',
})
export class CategoryDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoryService = inject(CategoryService);
  private readonly platformId = inject(PLATFORM_ID);

  idCategoryNow = signal<string>('');
  category = signal<Category>({} as Category);
  subCategories = signal<Categries[]>([]);
  loading = signal<boolean>(true);

  subCategoriesCount = computed(() => this.subCategories().length);

  ngOnInit(): void {
    this.getId();
  }

  getId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idCategoryNow.set(params.get('id')!);

      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      this.getCategoryDetails();
      this.getSubCategories();
    });
  }

  getCategoryDetails(): void {
    this.categoryService.getSpecificCategory(this.idCategoryNow()).subscribe({
      next: (res) => this.category.set(res.data),
    });
  }

  getSubCategories(): void {
  this.loading.set(true);

  this.categoryService.getSubCategoriesOfCategory(this.idCategoryNow()).subscribe({
    next: (res) => {
      this.subCategories.set(res.data);
      this.loading.set(false);
    },
    error: () => this.loading.set(false),
  });
}
}