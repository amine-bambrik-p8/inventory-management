import { IClient } from '@workspace/interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'workspace-client-grid-card',
  templateUrl: './client-grid-card.component.html',
  styleUrls: ['./client-grid-card.component.scss']
})
export class ClientGridCardComponent implements OnInit {
  @Input()
  client: IClient;
  constructor() { }

  ngOnInit(): void {
  }

}
