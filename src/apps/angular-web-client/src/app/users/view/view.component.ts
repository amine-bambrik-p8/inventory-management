import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UsersFacade } from '@workspace/core-data';
import { Observable } from 'rxjs';
import { IUser } from '@workspace/interfaces';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  user$:Observable<IUser>;
  id:string;
  constructor(private usersFacade:UsersFacade,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.user$ = this.activatedRoute.paramMap.pipe(
      map((params:ParamMap)=>{
        this.id = params.get("id");
        return this.id;
      }),
      switchMap((id:string)=>{
        this.usersFacade.readUser(id);
        return this.usersFacade.selectedUser$;
      })
    );
  }

  onEdit(user:IUser){
    this.router.navigate(["users",user._id,"edit"]);
  }

}
