import { Component, OnInit } from '@angular/core';
import { ClientsFacade } from '@workspace/core-data';
import { Observable } from 'rxjs';
import { IClient, IOrder } from '@workspace/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  id: string;
  client$:Observable<IClient> = this.clientsFacade.selectedClient$;;
  constructor(private clientsFacade:ClientsFacade,private activatedRoute:ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.loadData();
  }
  private loadData() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.clientsFacade.readClient(this.id);
  }
  onSelectOrder(order:IOrder){
    const orderId = order._id;
    this.router.navigate(["orders",orderId]);
  }
  onEdit(){
    this.router.navigate(['clients',this.id,'edit']);
  }
}
