import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { ApiUri } from '../models/api-uri';
import { User } from '../models/user';
import { showLoginModalSignal } from '../modal.state';
import { AccessToken } from '../models/access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  login(user:User):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${ApiUri}Auth/Login`, user).pipe(tap(response=>{
      sessionStorage.setItem("accessToken",JSON.stringify(response.accessToken));
      showLoginModalSignal.set(false);
    }))
  }
  refreshToken():Observable<AccessToken>{
    return this.http.get<AccessToken>(`${ApiUri}Auth/RefreshToken`).pipe(tap(response=>{
      sessionStorage.setItem("accessToken",JSON.stringify(response));
    }))
  }
}
