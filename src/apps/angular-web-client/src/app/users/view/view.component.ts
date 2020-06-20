import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, ActivatedRouteSnapshot } from '@angular/router';
import { UsersFacade } from '@workspace/core-data';
import { Observable } from 'rxjs';
import { IUser } from '@workspace/interfaces';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  selectedUser$:Observable<IUser> = this.usersFacade.selectedUser$;
  constructor(
    private usersFacade:UsersFacade,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData() {
    try {
      const id = this.activatedRoute.snapshot.paramMap.get("id");
      await this.usersFacade.readUser(id);
    } catch (error) {
      console.error(error);
    }
  }

  onEdit(user:IUser){
    this.router.navigate(["users",user._id,"edit"]);
  }

}
