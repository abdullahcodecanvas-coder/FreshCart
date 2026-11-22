import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Service, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Service()
export class CartService {
  private readonly httpClient = inject(HttpClient);
  count = signal<number>(0);

  refreshCount(): void {
    this.GetLoggedusercart().subscribe({
      next: (res) => this.count.set(res.numOfCartItems ?? res.data.products.length),
      error: () => this.count.set(0),
    });
  }

  AddProductToCart(productId: string): Observable<any> {
    return this.httpClient
      .post<any>(environment.baseUrl + `cart`, { productId })
      .pipe(tap((res) => this.count.set(res.numOfCartItems)));
  }

  Updatecartproductquantity(id: string, count: number): Observable<any> {
    return this.httpClient
      .put<any>(environment.baseUrl + `cart/${id}`, { count })
      .pipe(tap((res) => this.count.set(res.numOfCartItems)));
  }

  GetLoggedusercart(): Observable<any> {
    return this.httpClient.get<any>(environment.baseUrl + `cart`);
  }

  RemovespecificcartItem(id: string): Observable<any> {
    return this.httpClient
      .delete<any>(environment.baseUrl + `cart/${id}`)
      .pipe(tap((res) => this.count.set(res.numOfCartItems)));
  }

  Clearusercart(): Observable<any> {
    return this.httpClient
      .delete<any>(environment.baseUrl + `cart`)
      .pipe(tap(() => this.count.set(0)));
  }
}