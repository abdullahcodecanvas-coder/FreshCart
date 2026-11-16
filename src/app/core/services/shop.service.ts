import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Service()
export class ShopService {
    private readonly httpClient = inject(HttpClient);
   getAllProduct(page: number = 1, limit: number = 20): Observable<any> {
  return this.httpClient.get(environment.baseUrl + `products`, {
    params: { page, limit }
  });
}
    getSignalSpecifiProduct(id:string):Observable<any>{
        return  this.httpClient.get(environment.baseUrl +`products/${id}` )
    }
}
