import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Service()
export class WishlistService {
  private readonly httpClient = inject(HttpClient);
  count = signal<number>(0);

  refreshCount(): void {
    this.Getloggeduserwishlist().subscribe({
      next: (res) => this.count.set(res.count ?? res.data.length),
      error: () => this.count.set(0),
    });
  }

  Addproducttowishlist(id: string): Observable<any> {
    return this.httpClient
      .post<any>(environment.baseUrl + `wishlist`, { productId: id })
      .pipe(tap((res) => this.count.set(res.data.length)));
  }

  Removeproductfromwishlist(id: string): Observable<any> {
    return this.httpClient
      .delete<any>(environment.baseUrl + `wishlist/${id}`)
      .pipe(tap((res) => this.count.set(res.data.length)));
  }

  Getloggeduserwishlist(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl + `wishlist`);
  }
}