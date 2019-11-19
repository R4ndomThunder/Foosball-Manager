import { Injectable, NgZone } from '@angular/core';
import { TournamentUser } from "./services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';
import { CrudService } from './crud.service';
import { extraUserData } from './services/extraUserData';
import { SnackbarService } from './snackbar.service';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  extraData: extraUserData;
  message : any;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public snackBar: SnackbarService,
    public crud: CrudService,
    public messages: MessagingService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;        
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Firebase SignInWithPopup
  OAuthProvider(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      }).catch((error) => {
        this.snackBar.show("⚠ SignIn Error: " + error);
      })
  }

  // Firebase Google Sign-in
  SigninWithGoogle() {
    return this.OAuthProvider(new auth.GoogleAuthProvider())
      .then(res => {
        this.snackBar.show('🎉 Successfully logged in!')
      }).catch(error => {
        this.snackBar.show("⚠ SignIn Error: " + error)
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    
    this.messages.requestPermission(user.uid);
    this.messages.receiveMessage();
    this.message = this.messages.currentMessage;    

    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      window.location.reload();
      this.router.navigate(['/']);
    })
  }

}