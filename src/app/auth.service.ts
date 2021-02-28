import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth'
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) { }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }  

  // Auth logic to run auth providers
  AuthLogin(provider : firebase.auth.GoogleAuthProvider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!')
    }).catch((error) => {
        console.log(error)
    })
  }

}
