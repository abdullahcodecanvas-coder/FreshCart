import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class SubCategryService {
    private readonly httpClient =inject(HttpClient);

    GetAllSubCategories():Observable<any>{
    return  this.httpClient.get(environment.baseUrl +`subcategories`)
    }
    
    GetspecificSubCategory(id: string): Observable<any> {
  return this.httpClient.get(environment.baseUrl + `subcategories/${id}`);
}
getProductsByCategory(id: string): Observable<any> {
  return this.httpClient.get(environment.baseUrl + `products?category[in]=${id}&limit=100`);
}
}
