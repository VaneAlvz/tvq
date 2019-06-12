import { Injectable } from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Observable } from "rxjs/Observable";
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook } from "@ionic-native/facebook"

@Injectable()

export class AuthService {
    constructor(private afAuth: AngularFireAuth,
        private gPlus: GooglePlus, private fb: Facebook) {

    }

    registerEmail(email, password) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    LoginEmail(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    getStatus() {
        return this.afAuth.authState;
    }

    logout() {
        return this.afAuth.auth.signOut();
    }

    fbLogin() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

    google() {
        return Observable.create((observer) => {
            return this.gPlus.login({
                'webClientId': '276638302222-iiq81s3b4041mbdc8mh25tmgaunovntg.apps.googleusercontent.com',
                'offline': true
            })
            .then((res) => {
                const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
                this.afAuth.auth.signInWithCredential(firecreds)
                .then((success) => { observer.next(success); })
                .catch((error) => {
                    observer.error(error);
                });
            });
        })
    }

    fbLogi() {
        return Observable.create((observer) => {
            return this.fb.login(['email']).then((res) => {
                const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                this.afAuth.auth.signInWithCredential(fc).then((success) => { observer.next(success); })
                .catch((error) => {
                    observer.error(error);
                });
            });
        });
    }
}