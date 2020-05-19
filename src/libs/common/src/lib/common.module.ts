import { CrudService } from '@workspace/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { DataTransformInterceptor } from './interceptors/data-transform.interceptor';

@NgModule({
  imports: [
    AngularCommonModule,
    HttpClientModule,
  ],
  providers:[
    DataTransformInterceptor,
    
  ]
})
export class CommonModule {}
