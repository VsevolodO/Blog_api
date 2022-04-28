import { Injectable } from "@angular/core";
import { LogUser } from "./interfaces";
import {HttpClient} from"@angular/common/http";
import { Observable, tap } from "rxjs";
import { Token } from "@angular/compiler";

@Injectable({
    providedIn:'root'
}
)
export class AuthService{
    private token: string;
    constructor(private http: HttpClient){

    }
    login(user:LogUser):Observable<{token: string}>{
      
      return this.http.post<{token: string}>('/api/auth/login', user)
        .pipe(
          tap(({token}) =>{
            localStorage.setItem('auth-token',token)
          })
        )
      
  }
    registration(user: LogUser){
      return this.http.post('/api/auth/registration', user)
  }
    
    isAuthenticated(): boolean {
      return !!this.token
  }
  

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }
}