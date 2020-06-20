import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsFacade } from '@workspace/core-data';
import { IClient } from '@workspace/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  selectedClient$ = this.clientsFacade.selectedClient$;
  constructor(
    private clientsFacade:ClientsFacade,
    private activatedRoute:ActivatedRoute,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async onSubmit(client: IClient){
    try {
      await this.clientsFacade.updateClient(client);
      this.router.navigate(['clients']);
    } catch (error) {
      console.error(error);
    }
  }
  private async loadData(): Promise<void>{
    try {
      const id = this.activatedRoute.snapshot.paramMap.get("id")
      await this.clientsFacade.readClient(id);
    } catch (error) {
      console.error(error);
    }
  }
}
