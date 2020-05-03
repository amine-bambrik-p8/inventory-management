import { HttpClient } from '@angular/common/http';
import { ISupplier } from '@workspace/interfaces';
import { Injectable } from '@angular/core';
import { CrudService } from '@workspace/common';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService extends CrudService<ISupplier> {

  constructor(protected http: HttpClient) {
    super(http,'suppliers');
  }
}
