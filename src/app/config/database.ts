import Dexie from 'dexie';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Db extends Dexie {
    constructor () {
        super("MyAppDatabase");
        this.version(1).stores({
            users: `id++, email, password, role, active`,
            webtoons: `id++, title, description, price, active`,
            books: `id++, title, description, price, active`,
            podcasts: `id++, title, description, price, active`
            //...other tables goes here...
        });
    }
}

