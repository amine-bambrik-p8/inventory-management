import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '@workspace/common';
import { IClient } from '@workspace/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientsService extends CrudService<IClient> {

  constructor(protected http: HttpClient) { 
    super(http,'clients');
  }
}
