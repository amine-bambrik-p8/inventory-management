import { HttpClient } from '@angular/common/http';
import { IUser } from '@workspace/interfaces';
import { Injectable } from '@angular/core';
import { CrudService } from '@workspace/common';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends CrudService<IUser> {

  constructor(protected http: HttpClient) {
    super(http,'users');
  }
}
