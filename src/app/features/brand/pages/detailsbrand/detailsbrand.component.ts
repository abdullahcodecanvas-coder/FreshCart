import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandService } from '../../../../core/services/brand.service';
import { DatePipe } from '@angular/common';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-detailsbrand',
  styleUrl: './detailsbrand.component.css',
  templateUrl: './detailsbrand.component.html',
})
export class DetailsbrandComponent {
 private readonly activatedRoute = inject(ActivatedRoute);
  private readonly brandService = inject(BrandService);

  brand = signal<any | null>(null);
  products = signal<any[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;

      this.loading.set(true);

      this.brandService.getIdBrands(id).subscribe({
        next: (res) => this.products.set(res.data),
        error: (err) => console.log(err),
      });

      this.brandService.getIdBrands(id).subscribe({
        next: (res) => {
          this.brand.set(res.data);
          this.loading.set(false);
        },
        error: (err) => {
          console.log(err);
          this.loading.set(false);
        },
      });
    });
  }
}
