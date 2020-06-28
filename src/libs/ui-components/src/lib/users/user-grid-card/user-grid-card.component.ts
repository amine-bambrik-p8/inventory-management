import { Router } from '@angular/router';
import { IUser } from '@workspace/interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { UsersFacade } from '@workspace/core-data';

@Component({
  selector: 'workspace-user-grid-card',
  templateUrl: './user-grid-card.component.html',
  styleUrls: ['./user-grid-card.component.scss']
})
export class UserGridCardComponent implements OnInit {
  @Input()
  user:IUser;
  constructor(private router:Router,private usersFacade:UsersFacade) { }

  ngOnInit(): void {
  }

  onEdit(user: IUser){
    this.router.navigate(["users",user._id,"edit"]);
  }
  onDelete(user: IUser){
    try {
      this.usersFacade.deleteUser(user);
    } catch (error) {
      console.error(error);      
    }
  }

}
