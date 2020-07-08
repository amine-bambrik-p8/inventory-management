import { IClient } from '@workspace/interfaces';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ClientsFacade } from '@workspace/core-data';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  form: FormGroup = this.fb.group({
    firstName:[''],
    lastName:[''],
    address:this.fb.group({
      city:[''],
      address:[''],
      zip:[''],
    }),
    phoneNumber:[''],
    email:['']
  });
  constructor(private clientsFacade:ClientsFacade,private fb:FormBuilder,private router:Router) {}

  ngOnInit(): void {
    
  }
  onSubmit(){
    const client: IClient = this.form.value;
    this.clientsFacade.addClient(client);
    this.router.navigate(['clients']);
  }
}
