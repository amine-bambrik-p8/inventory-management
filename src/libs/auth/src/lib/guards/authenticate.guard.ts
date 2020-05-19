import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtAuthService } from '../services/jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {
  constructor(
    private auth:JwtAuthService,
    private router:Router
    ){}
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticate(state.url);
  }
  private authenticate(url?:string){
    if(!this.auth.isAuthenticated$.value){
      this.router.navigate(
        ['login'],
        {
          queryParams:{
            returnUrl:url,
          }
        });
      return false;
    }
    return true;
  }
}
