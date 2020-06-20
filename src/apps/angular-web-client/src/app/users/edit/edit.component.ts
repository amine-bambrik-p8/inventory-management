import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsersFacade } from '@workspace/core-data';
import { Router, ActivatedRoute, ParamMap, ActivatedRouteSnapshot } from '@angular/router';
import { IUser } from '@workspace/interfaces';
import { map, take, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  
  selectedUser$:Observable<IUser> = this.usersFacade.selectedUser$;
  
  constructor(
    private usersFacade:UsersFacade,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData();
  }


  async onSubmit(user:IUser){
    try {
      await this.usersFacade.updateUser(user);
      this.router.navigate(["/users"])
    } catch (error) {
      console.error(error);
    }
  }

  private async loadData() {
    try {
      const id: string = this.activatedRoute.snapshot.paramMap.get("id");
      this.usersFacade.readUser(id);
    } catch (error) {
      console.error(error);
    }
  }
}