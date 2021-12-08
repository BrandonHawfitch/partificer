import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private afAuth: AngularFireAuth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.afAuth.authState.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.uid),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
