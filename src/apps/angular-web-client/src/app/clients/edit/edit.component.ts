import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, switchMap, takeWhile, take, filter } from 'rxjs/operators';
import { ClientsFacade } from '@workspace/core-data';
import { IClient } from '@workspace/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup = this.fb.group({
    _id:[''],
    firstName:[''],
    lastName:[''],
    address:this.fb.group({
      city:[''],
      address:[''],
      zip:[''],
    }),
    phoneNumber:[''],
    email:[''],
  });
  constructor(private clientsFacade:ClientsFacade,private activatedRoute:ActivatedRoute,private router:Router,private fb: FormBuilder) {}

  ngOnInit(): void {
    
    this.activatedRoute.paramMap.pipe(
      map((params:ParamMap)=>{
        return params.get("id");
      }),
      take(1)
    ).subscribe((id:string)=>{
      this.clientsFacade.readClient(id);
    });
    this.clientsFacade.selectedClient$
    .pipe(
      filter(client=>!!client),
      take(1)
    ).subscribe((client:IClient)=>{
      this.form.patchValue(client);
    });
  }

  onSubmit(){
    const client: IClient = this.form.value;
    this.clientsFacade.updateClient(client);
    this.router.navigate(['clients']);
  }
}
