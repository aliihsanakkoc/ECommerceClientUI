import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { ApiUri } from '../models/api-uri';
import { User } from '../models/user';
import { showLoginModalSignal } from '../modal.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  login(user:User):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${ApiUri}Auth/Login`, user, {withCredentials:true}).pipe(tap(response=>{
      sessionStorage.setItem("accessToken",JSON.stringify(response.accessToken));
      showLoginModalSignal.set(false);
    }))
  }
}
