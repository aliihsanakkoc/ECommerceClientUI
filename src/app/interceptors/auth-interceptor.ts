import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { accessTokenSignal } from '../access-token-signal';
import { showLoginModalSignal } from '../modal.state';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { switchMap } from 'rxjs';
import { AccessToken } from '../models/access-token';
import { ApiUri } from '../models/api-uri';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  req = addCommonHeaders(req);

  if(req.url.startsWith(`${ApiUri}Auth`)) return next(req);

  if(!accessTokenSignal()){
    showLoginModalSignal.set(true);
    return next(req);
  }

  if(accessTokenSignal()&&!isTokenExpired(accessTokenSignal()?.expirationDate)){
    req = setAuthHeader(req, accessTokenSignal()?.token);
    return next(req);
  }else{
    const authService = inject(AuthService);
    return authService.refreshToken().pipe(switchMap((newToken:AccessToken)=>{
      const clonedReq = setAuthHeader(req,newToken.token);
      return next(clonedReq);
    }))
  }
};
function addCommonHeaders(request:HttpRequest<any>):HttpRequest<any>{
  const headers : Record<string,string>={
    'Accept-Language':'en-US'
  }
  if(request.method!=='GET') headers['Content-Type']='application/json';
  return request.clone({setHeaders:headers, withCredentials:true});
}
function isTokenExpired(exp:Date|undefined):boolean{
  return exp===undefined?false:(new Date()>=new Date(exp));
}
function setAuthHeader(request:HttpRequest<any>, token:string|undefined):HttpRequest<any>{
  return token===undefined?request:request.clone({setHeaders:{Authorization:`Bearer ${token}`}});
}