import { IUser } from '@workspace/interfaces';
import { Observable } from 'rxjs';
import { UsersFacade } from '@workspace/core-data';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<IUser[]> = this.users.allUsers$;
  constructor(private users:UsersFacade,private router:Router) { }

  ngOnInit(): void {
    this.users.loadUsers();
  }
  onAdd(){
    this.router.navigate(["users","add"])
  }
  onView(user:IUser){
    this.router.navigate(["users",user._id]);
  }
}
