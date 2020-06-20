import { Component, OnInit } from '@angular/core';
import { IUser } from '@workspace/interfaces';
import { UsersFacade } from '@workspace/core-data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  

  constructor(
    private usersFacade:UsersFacade,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  async onSubmit(user:IUser){
    try {
      await this.usersFacade.addUser(user);
      this.router.navigate(["/users"])
    } catch (error) {
      console.error(error);
    }
  }
}
