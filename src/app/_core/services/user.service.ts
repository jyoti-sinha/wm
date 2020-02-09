import { Injectable } from '@angular/core';
import {Db} from '../../config/database';
import { from, Observable } from 'rxjs';
import Dexie from 'dexie';
import { tap } from 'rxjs/operators';
import { AppUser } from '../models/app-user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  table: Dexie.Table<any, any>;
  constructor(private db: Db) { 
    this.table = this.db.table('users');
  }

  getUserList():Observable<any> {
    return from(this.table.toArray())
  }

  getUser(userId: Number):Observable<any> {
    return from(this.table.get(userId))
  }

}