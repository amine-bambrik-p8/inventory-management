import { IUser } from '@workspace/interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'workspace-user-grid-card',
  templateUrl: './user-grid-card.component.html',
  styleUrls: ['./user-grid-card.component.scss']
})
export class UserGridCardComponent implements OnInit {
  @Input()
  user:IUser;
  constructor() { }

  ngOnInit(): void {
  }

}
