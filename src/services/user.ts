import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";


@Injectable()

export class UserService {
    constructor(private afDb: AngularFireDatabase) {
    }

    getUsers() {
        return this.afDb.list('/usuarios/');
    }

    getUser(uid) {
        return this.afDb.object('/usuarios/' + uid);
    }

    createUser(user) {
        return this.afDb.object('/usuarios/' + user.uid).set(user);
    }

    editUser(user) {
        return this.afDb.object('/usuarios/' + user.uid).set(user);
    }

    updateUser(uid, data) {
        return this.afDb.object('/usuarios/' + uid).update(data);
    }

    deleteUser(user) {
        return this.afDb.object('/usuarios/' + user.uid).remove();
    }

}