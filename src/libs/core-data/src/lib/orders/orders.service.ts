import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '@workspace/common';
import { IOrder } from '@workspace/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends CrudService<IOrder> {

  constructor(protected http: HttpClient) {
    super(http,'orders');
  }
}
