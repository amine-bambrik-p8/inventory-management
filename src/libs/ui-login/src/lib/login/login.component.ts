import { Router } from '@angular/router';
import { JwtAuthService } from '@workspace/auth';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:FormGroup = this.fb.group({
    username:[''],
    password:['']
  });
  constructor(private auth:JwtAuthService,private route:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuth: Boolean)=>{
      if(isAuth){
        this.route.navigate(['/']);
      }
    })
  }
  login(): void{
    const {username,password} = this.form.value;
    this.auth.login(username,password);
  }
}
