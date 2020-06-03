import { CrudService } from '@workspace/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { DataTransformInterceptor } from './interceptors/data-transform.interceptor';
import { LetDirective } from './directives/let.directive';

@NgModule({
  declarations:[
    LetDirective
  ],
  imports: [
    AngularCommonModule,
    HttpClientModule,
  ],
  providers:[
    DataTransformInterceptor,
    
  ],
  exports:[
    LetDirective,
  ]
})
export class CommonModule {}
