import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '@workspace/common';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends CrudService<OrdersService> {

  constructor(protected http: HttpClient) {
    super(http,'orders');
  }
}
