import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Db} from '../config/database';
import Dexie from 'dexie';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  table: Dexie.Table<any, any>;
  constructor(private fb: FormBuilder, private router: Router, private db: Db) {
    this.table = this.db.table('users');
   }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.registerForm.invalid){
      const controls = this.registerForm.controls;
      Object.keys(controls).forEach(item => {
        controls[item].markAsTouched()
      })
      return false;
    } 
    let form_data = this.registerForm.value;
    form_data.active = '1';
    this.table.add(form_data).then(res => {
        this.router.navigate(['login'])
    }).catch (err => {
        console.log(err)
    });
  }

}
