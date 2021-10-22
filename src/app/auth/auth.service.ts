import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from '../../environments/environment';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_KEY = environment.firebaseConfig.apiKey;
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            this.expirationSecondsLeftToDate(+resData.expiresIn)
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            this.expirationSecondsLeftToDate(+resData.expiresIn)
          );
        })
      );
  }

  googleLogin() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const authObservable = from(signInWithPopup(auth, provider));

    return authObservable.pipe(
      switchMap((userCredential: UserCredential) => {
        // Extracts credentials
        const credential =
          GoogleAuthProvider.credentialFromResult(userCredential);
        const token = credential.accessToken;
        const user = userCredential.user;
        // Converts credentials into usable values
        return from(user.getIdTokenResult()).pipe(
          map((tokenResult) => {
            const expirationDate = new Date(tokenResult.expirationTime);
            return this.handleAuthentication(
              user.email,
              user.uid,
              token,
              expirationDate
            );
          }),
          tap(() => this.router.navigate(['/'])),
          catchError((error) => this.handleError(error))
        );
      })
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    // Extracts user data from storage and formats it
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    // Checks if userData is null

    if (!userData) {
      return;
    }

    const expirationDate = new Date(userData._tokenExpirationDate);

    // Creates a User object from extracted data
    const user = new User(
      userData.email,
      userData.id,
      userData._token,
      expirationDate
    );
    // If user token is valid, emit the user as the current user
    if (user.token) {
      this.user.next(user);
      this.autoLogout(this.expirationDateToSecondsLeft(expirationDate));
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration * 1000);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expirationDate: Date
  ) {
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(this.expirationDateToSecondsLeft(expirationDate));

    localStorage.setItem('userData', JSON.stringify(user));

    return user;
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is incorrect!';
        break;
      default:
        errorMessage = errorResponse.message;
    }
    return throwError(errorMessage);
  }

  private expirationDateToSecondsLeft(date: Date): number {
    const curTime = new Date().getTime();
    const expTime = date.getTime();
    const secondsLeft = (expTime - curTime) / 1000;
    return secondsLeft;
  }

  private expirationSecondsLeftToDate(expiresIn: number): Date {
    const curTime = new Date().getTime();
    const milsLeft = expiresIn * 1000;
    const expirationDate = new Date(curTime + milsLeft);
    return expirationDate;
  }
}
