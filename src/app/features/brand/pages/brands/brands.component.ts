import { Component, inject, signal } from '@angular/core';
import { BrandService } from '../../../../core/services/brand.service';
import { RouterLink } from '@angular/router';
import { Brand } from '../../../../core/models/brand.interface';

@Component({
  imports: [RouterLink],
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
}
