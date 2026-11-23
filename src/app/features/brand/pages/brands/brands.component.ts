import { Component, inject, signal } from '@angular/core';
import { BrandService } from '../../../../core/services/brand.service';
import { RouterLink } from '@angular/router';
import { Brand } from '../../../../core/models/brand.interface';
import { SearchService } from '../../../../core/services/search.service';
import { TranslatePipe } from '@ngx-translate/core';
import { SearchPipe } from '../../../../shared/pipes/search-pipe';

@Component({
  imports: [RouterLink , TranslatePipe ,SearchPipe],
  selector: 'app-brands',
  styleUrl: './brands.component.css',
  templateUrl: './brands.component.html',
})
export class BrandsComponent {
   private readonly brandService = inject(BrandService);
  brands = signal<Brand[]>([]);

  ngOnInit(): void {
    this.brandService.getAllBrands().subscribe({
      next: (res) => this.brands.set(res.data),
      error: (err) => console.log(err),
    });
  }
   private readonly searchService = inject(SearchService);
}
