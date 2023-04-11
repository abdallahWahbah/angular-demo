import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  error: string;
  constructor(private authService: AuthService,
              private router: Router){}

  switchMode()
  {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm)
  {
    this.isLoading = true;

    if(this.isLoginMode)
    {
      this.authService
      .login(form.value.email, form.value.password)
      .subscribe(response =>
      {
        this.isLoading = false;
        this.router.navigate(["/flights"])
      }, error =>
      {
        this.isLoading = false;
        switch(error.error.error.message)
        {
          case "EMAIL_NOT_FOUND":
          {
            this.error = "The email you entered is not found";
            break;
          }
          case "INVALID_PASSWORD":
          {
            this.error = "wrong password";
            break;
          }
          default: {
            this.error = "Error Occured";
            break;
          }
        }
      })
    }
    else
    {
      this.authService
      .signup(form.value.email, form.value.password)
      .subscribe(response =>
      {
        this.isLoading = false;
        console.log(response)
      },error =>
      {
        this.isLoading = false;
        switch(error.error.error.message)
        {
          case "EMAIL_EXISTS":
          {
            this.error = "The email you entered exists";
            break;
          }
          case "TOO_MANY_ATTEMPTS_TRY_LATER":
          {
            this.error = "Try again later";
            break;
          }
          default: {
            this.error = "Error Occured";
            break;
          }
        }
      })
    }
  }
}
