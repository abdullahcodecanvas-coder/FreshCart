import { Component, inject, OnInit, signal } from '@angular/core';
import { PromoBannaerComponent } from '../promo-bannaer/promo-bannaer.component';
import { SectionTitleComponent } from '../../../../shared/ui/section-title/section-title.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CategoryService } from '../../../../core/services/categry.service';
import { RouterLink } from '@angular/router';


@Component({
  imports: [PromoBannaerComponent, SectionTitleComponent, TranslatePipe, RouterLink],
  selector: 'app-categrey-home',
  styleUrl: './categrey-home.component.css',
  templateUrl: './categrey-home.component.html',
})
export class CategreyHomeComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);

  categories = signal<Categries[]>([]);

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getAllCategories(1, 10).subscribe({
      next:(res) => {
      this.categories.set(res.data);
        console.log(res)
      }
    });
  }
}