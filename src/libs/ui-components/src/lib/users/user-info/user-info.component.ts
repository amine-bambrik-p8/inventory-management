import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '@workspace/interfaces';

@Component({
  selector: 'workspace-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input()
  user:IUser;
  constructor() { }
  ngOnInit(): void {
  }

}
