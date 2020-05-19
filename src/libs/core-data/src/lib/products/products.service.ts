import { HttpClient } from '@angular/common/http';
import { IProduct } from '@workspace/interfaces';
import { Injectable } from '@angular/core';
import { CrudService } from '@workspace/common';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends CrudService<IProduct>{

  constructor(protected http: HttpClient) {
    super(http,'products');
  }
}
