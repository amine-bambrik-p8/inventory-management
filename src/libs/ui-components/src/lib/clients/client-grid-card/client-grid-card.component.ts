import { IClient } from '@workspace/interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsFacade } from '@workspace/core-data';

@Component({
  selector: 'workspace-client-grid-card',
  templateUrl: './client-grid-card.component.html',
  styleUrls: ['./client-grid-card.component.scss']
})
export class ClientGridCardComponent implements OnInit {
  @Input()
  client: IClient;
  constructor(private router:Router,private clientsFacade:ClientsFacade) { }

  ngOnInit(): void {
  }
  onEdit(client: IClient){
    this.router.navigate(["clients",client._id,"edit"]);
  }
  onDelete(client: IClient){
    this.clientsFacade.deleteClient(client);
  }
}
