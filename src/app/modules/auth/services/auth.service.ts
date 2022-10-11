import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly urlBase = environment.api;
  constructor(private httpClient: HttpClient, private cookie:CookieService) { }

  sendCredentials(email: string, password: string): Observable<any> {
    const credentials = {
      email,
      password
    }
    return this.httpClient.post(`${this.urlBase}/auth/login`, credentials)
    .pipe(
      tap((respOk: any) => {
        const {tokenSession, data} = respOk;
        this.cookie.set('token', tokenSession, 4, '/');
      })
    )
  }
}
