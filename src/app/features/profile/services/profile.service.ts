import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Service()
export class ProfileService {
    private readonly httpClient =inject(HttpClient)
    AddAddress(data:object):Observable<any>{
        return this.httpClient.post(environment.baseUrl+`addresses` , data )
    }
    RemoveAddress(id:string):Observable<any>{
        return this.httpClient.delete(environment.baseUrl+`addresses/${id}` )
    }
    GetSpecificAddress(id:string):Observable<any>{
        return this.httpClient.get(environment.baseUrl+`addresses/${id}` )
    }
    GetLoggedUserAddresses():Observable<any>{
        return this.httpClient.get(environment.baseUrl+`addresses` )
    }
        UpdateAddress(id: string, data: object): Observable<any> {
        return this.httpClient.put(environment.baseUrl + `addresses/${id}`, data)
    }
    changePassword(data: object): Observable<any> {
  return this.httpClient.put(environment.baseUrl + `users/changeMyPassword`, data);
}
}
