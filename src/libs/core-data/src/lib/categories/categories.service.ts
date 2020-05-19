import { HttpClient } from '@angular/common/http';
import { ICategory } from '@workspace/interfaces';
import { Injectable } from '@angular/core';
import { CrudService } from '@workspace/common';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends CrudService<ICategory> {

  constructor(protected http:HttpClient) {
    super(http,'categories');
  }
  
}
