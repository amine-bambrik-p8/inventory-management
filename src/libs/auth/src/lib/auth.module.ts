import { JwtAuthService } from './services/jwt-auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { AuthenticateGuard } from './guards/authenticate.guard';
import { JwtTokenInterceptor } from './interceptors/jwt-token.interceptor';
@NgModule({
  providers:[
    JwtTokenInterceptor,
    AuthenticateGuard,
    JwtAuthService,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class AuthModule {}
