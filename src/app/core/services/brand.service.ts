import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Service()
export class BrandService {
  private readonly httpClient = inject(HttpClient);
  getAllBrands():Observable<any>{
    return this.httpClient.get(environment.baseUrl +`brands`);
  }
  getIdBrands(id:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl +`brands/${id}`);
  }

}
