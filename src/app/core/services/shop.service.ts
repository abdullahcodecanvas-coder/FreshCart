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

    getFilteredProducts(page: number,limit: number,subcategory?: string,category?: string): Observable<any> {
  const params: Record<string, string | number> = { page, limit };
  if (subcategory) params['subcategory[in]'] = subcategory;
  if (category) params['category[in]'] = category;

  return this.httpClient.get(environment.baseUrl + `products`, { params });
}

getCategoryById(id: string): Observable<any> {
  return this.httpClient.get(environment.baseUrl + `categories/${id}`);
}

getSubcategoryById(id: string): Observable<any> {
  return this.httpClient.get(environment.baseUrl + `subcategories/${id}`);
}
}
