import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Service()
export class WishlistService {
    private readonly httpClient  = inject(HttpClient);
    Addproducttowishlist(id:string):Observable<any>{
     return  this.httpClient.post(environment.baseUrl +`wishlist` , {
    "productId": id})
    }
    Removeproductfromwishlist(id:string):Observable<any>{
        return this.httpClient.delete(environment.baseUrl+`wishlist/${id}`)
    }
    Getloggeduserwishlist():Observable<any>{
        return this.httpClient.get(environment.baseUrl+`wishlist`)
    }
}
