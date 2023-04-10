import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { pipe, tap } from "rxjs";
import { User } from "./auth.model";
import { Router } from "@angular/router";


interface AuthResponseData
{
    idToken: string, 
    email: string,
    refreshToken: string, 
    expiresIn: string,
    localId: string, 
}
@Injectable({providedIn: "root"})
export class AuthService
{
    user: User;
    tokenTimer: any;

    constructor(private http: HttpClient,
                private router: Router){}

    signup(email: string, password: string)
    {
        return this.http
        .post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo0TvD673zr-j9osbmQnQZc0uj8o8RIOs",
        {
            email,
            password,
            returnSecureToken: true
        })
        .pipe(tap(response =>
        {   
            const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
            const newUser = new User(response.email, response.localId, response.idToken, expirationDate)
            this.user = newUser;
            this.autoLogout(+response.expiresIn * 1000);
            localStorage.setItem("userData", JSON.stringify(newUser))
        }))
    }
    login(email: string, password: string)
    {
        return this.http
        .post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo0TvD673zr-j9osbmQnQZc0uj8o8RIOs",
        {
            email,
            password,
            returnSecureToken: true
        })
        .pipe(tap(response =>
        {   
            const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
            const newUser = new User(response.email, response.localId, response.idToken, expirationDate)
            this.user = newUser;
            this.autoLogout(+response.expiresIn * 1000);
            localStorage.setItem("userData", JSON.stringify(newUser))
        }))
    }
    autoLogin()
    {
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        if(!userData) return;

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

        if(loadedUser.token)
        {
            this.user = loadedUser;
            const time = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(time)
        }
    }
    autoLogout(time: number)
    {
        this.tokenTimer = setTimeout(()=>
        {
            this.logout();
        }, time)
    }
    logout()
    {
        this.user = new User("", "", "", new Date);
        this.router.navigate(['/auth'])
        localStorage.removeItem("userData")
    }
}