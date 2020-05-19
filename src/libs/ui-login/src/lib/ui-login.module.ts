import { RouterModule } from '@angular/router';
import { MaterialModule } from '@workspace/material';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    MaterialModule, 
    RouterModule
  ],
  declarations: [LoginComponent],
  exports:[LoginComponent]
})
export class UiLoginModule {}
