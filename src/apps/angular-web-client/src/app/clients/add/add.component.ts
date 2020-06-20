import { IClient } from '@workspace/interfaces';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsFacade } from '@workspace/core-data';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  
  constructor(
    private clientsFacade:ClientsFacade,
    private router:Router
    ) {}

  ngOnInit(): void {
    
  }
  async onSubmit(client:IClient){
    try {
      await this.clientsFacade.addClient(client);
      this.router.navigate(['clients']);
    } catch (error) {
      console.error(error);
    }
  }
}
