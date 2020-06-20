import { CrudService } from '@workspace/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { DataTransformInterceptor } from './interceptors/data-transform.interceptor';
import { LetDirective } from './directives/let.directive';
import { SumOverPipe } from './pipes/sumOver/sum-over.pipe';

@NgModule({
  declarations:[
    LetDirective,
    SumOverPipe
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
    SumOverPipe,
  ]
})
export class CommonModule {}
