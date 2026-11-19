import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Service()
export class RegisterService {
    private readonly httpClient = inject(HttpClient); 
    isLogged = signal(false);
    Signup(data:object):Observable<any>{
    return  this.httpClient.post(environment.baseUrl + `auth/signup` , data)
    }
    Signin(data:object):Observable<any>{
    return  this.httpClient.post(environment.baseUrl + `auth/signin` , data)
    }
    forgotPasswords(data:object):Observable<any>{
    return  this.httpClient.post(environment.baseUrl + `auth/forgotPasswords` , data)
    }
    verifyResetCode(data:object):Observable<any>{
    return  this.httpClient.post(environment.baseUrl + `auth/verifyResetCode` , data)
    }
    resetPassword(data:object):Observable<any>{
    return  this.httpClient.put(environment.baseUrl + `auth/resetPassword` , data)
    }

}
