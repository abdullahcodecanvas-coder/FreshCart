import { HttpClient } from '@angular/common/http';
import { DOCUMENT, inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Service()
export class CheckService {
    private readonly httpClient = inject(HttpClient);
    CreateCashOrder(id:string , data:object):Observable<any>{
        return this.httpClient.post(environment.baseUrl+`orders/${id}` , data)
    }
    getAllOrders(id:string):Observable<any>{
        return this.httpClient.get(environment.baseUrl+`orders/user/${id}`)
    }
 private readonly document = inject(DOCUMENT);

  Checkoutsession(id: string, data: object): Observable<any> {
    const origin = this.document.location.origin;

    return this.httpClient.post(
      `${environment.baseUrl}orders/checkout-session/${id}?url=${origin}`,
      data
    );
  }

}
