import { Component, OnInit } from '@angular/core';
import { ClientsFacade } from '@workspace/core-data';
import { Observable } from 'rxjs';
import { IClient } from '@workspace/interfaces';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  id: string;
  client$:Observable<IClient>;
  constructor(private clientsFacade:ClientsFacade,private activatedRoute:ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.client$ = this.activatedRoute.paramMap.pipe(
        map((params:ParamMap)=>{
          this.id = params.get("id");
          console.log(this.id);

          return this.id;
        }),
        switchMap((id:string)=>{
          this.clientsFacade.readClient(id);
          return this.clientsFacade.selectedClient$;
        })
      );
  }
  onEdit(){
    this.router.navigate(['clients',this.id,'edit']);
  }
}
