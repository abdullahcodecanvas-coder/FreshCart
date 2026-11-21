import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Service()
export class CartService {
    private readonly httpClient = inject(HttpClient)
    AddProductToCart(productId:string):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`cart` ,{
    "productId": productId
    });
    }
    Updatecartproductquantity(id:string,count:number):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`cart/${id}` ,{
    "count": count
    });
    }  
    GetLoggedusercart():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`cart`)
    }
    RemovespecificcartItem(id:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`cart/${id}`)
    }
    Clearusercart():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`cart`)
    }
}
