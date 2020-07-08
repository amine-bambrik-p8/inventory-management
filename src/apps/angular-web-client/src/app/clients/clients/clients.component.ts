import { Observable } from 'rxjs';
import { ClientsFacade } from '@workspace/core-data';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IClient } from '@workspace/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients$:Observable<IClient[]> = this.clients.allClients$;
  constructor(private clients:ClientsFacade,private router: Router) {
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  onAdd(){
    this.router.navigate(["clients","add"])
  }
  onView(client:IClient){
    this.router.navigate(["clients",client._id])
  }

  onLoadData(){
    this.clients.loadClients();
  }
}
