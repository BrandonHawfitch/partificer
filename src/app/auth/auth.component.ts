import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  FirebaseUISignInSuccessWithAuthResult,
  FirebaseUISignInFailure,
} from 'firebaseui-angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.afAuth.signOut();
  }

  successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    // console.log('successCallback', data);
    this.router.navigate(['']);
  }

  errorCallback(data: FirebaseUISignInFailure) {}

  uiShownCallback() {}
}
