import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Db} from '../config/database';
import Dexie from 'dexie';

import { Store, select } from '@ngrx/store';

import { AppState } from '../store/state/app.state';
import { AppConfigAction } from '../store/actions/config.action';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  table: Dexie.Table<any, any>;
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    //private _store: Store<AppState>, 
    private db: Db
    ) { 
     this.table = this.db.table('users');
    }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    })
    
  }

  onSubmit() {
    if(this.loginForm.invalid){
      const controls = this.loginForm.controls;
      Object.keys(controls).forEach(item => {
        controls[item].markAsTouched()
      })
      return false;
    } 
    this.table.get(this.loginForm.value, user => {
      if(user){
        window.localStorage.setItem('user', JSON.stringify(user))
        //this._store.dispatch(new AppConfigAction(user));
        if(user.role === '1'){
          this.router.navigate(['admin']);
        }else if(user.role === '2'){
          this.router.navigate(['']);
        }        
      }else{
        alert('Requested user not found!');
      }
    }).catch (err => {
        console.log(err)
    });
  }

}