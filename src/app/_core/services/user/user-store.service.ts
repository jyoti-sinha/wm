import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import {Db} from '../../../config/database';
import Dexie from 'dexie';

import { Store } from '../../../subject-store/store';
import { UserState, initialState } from '../../models/user/user-state';
import { User } from '../../models/user/user';

@Injectable()
export class UserStoreService extends Store<UserState> {
  table: Dexie.Table<any, any>;
  constructor(private db: Db) {
    super(initialState);
    this.table = this.db.table('users');
  }

  loadUsers(): void{
    this.table.toArray((data) => {
      if(data.length > 0){
         const newSate = {
          ...this.state,
          users: [].concat(data)
        }

        this.setState(newSate);
      }else{
        this.addUser(null)
      }
      
    })
  }

  addUser(user: User): void{
    const newSate = {
      ...this.state,
      users: [].concat(this.state.users, user)
    }
    this.setState(newSate);
  }

}