import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { sharedEnvironment as environment } from '@workspace/environments';
import { JwtAuthResponse } from '../interfaces/jwt-auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {
  private readonly model = "sign-in";
  private readonly _isAuthenticated$ = new BehaviorSubject<Boolean>(false);
  constructor(private http:HttpClient) {
    
  }

  private get url(): string {
    return `${environment.url}/${this.model}`;
  }
  
  public login(username: string,password: string): Observable<string>{
    const token$: Observable<string> = this.http.post<JwtAuthResponse>(this.url,{
      username,
      password,
    }).pipe(
      map((response: JwtAuthResponse)=>{
        return response.token;
      })
    );
    token$.subscribe((token: string)=>{
      this.token=token;
    });
    return token$;
  }

  public logout(): void{
    this.token = "";
  }
  
  get isAuthenticated$(): BehaviorSubject<Boolean>{
    this._isAuthenticated$.next(this.token !== "");
    return this._isAuthenticated$;
  }

  public get token(): string{
    return localStorage.getItem("token");
  }
  public set token(value){
    localStorage.setItem("token",value);
  }


}
