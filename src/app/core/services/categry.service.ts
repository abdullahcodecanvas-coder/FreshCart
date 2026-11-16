import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly httpClient = inject(HttpClient);

  getAllCategories(page: number, limit: number, keyword?: string): Observable<any> {
    const params: Record<string, string | number> = { page, limit };
    if (keyword) params['keyword'] = keyword;

    return this.httpClient.get(environment.baseUrl + `categories`, { params });
  }

  getSpecificCategory(id: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `categories/${id}`);
  }

  getSubCategoriesOfCategory(id: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `categories/${id}/subcategories`, {
      params: { limit: 50 },
    });
  }

}