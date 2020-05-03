import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';

@NgModule({
  imports: [
    AngularCommonModule,
    HttpClientModule
  ]
})
export class CommonModule {}
