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
  error: string;

  constructor(private authService: AuthService,
              private router: Router){}

  switchMode()
  {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(formData: NgForm)
  {
    if(this.isLoginMode)
    {
      this.authService.login(formData.value.email, formData.value.password)
      .subscribe(resposne=>
      {
        console.log(resposne)
        this.router.navigate(['/flights'])
      }, error =>
      {
        switch(error.error.error.message)
        {
          case "EMAIL_NOT_FOUND":{
            this.error = "The email you entered doesn't exist";
            break;
          }
          case "INVALID_PASSWORD":{
            this.error = "Invalid password";
            break;
          }
          default: {
            this.error = "Unknown error";
            break;
          }
        }
      })
    }
    else
    {
      this.authService.signup(formData.value.email, formData.value.password)
      .subscribe(response =>
      {
        console.log(response)
        this.router.navigate(['/flights'])
      }, error =>
      {
        switch(error.error.error.message)
        {
          case "EMAIL_EXISTS":{
            this.error = "The email you entered exists";
            break;
          }
          case "TOO_MANY_ATTEMPTS_TRY_LATER":{
            this.error = "You tried to signup too many times, try again later";
            break;
          }
          default: {
            this.error = "Unknown error";
            break;
          }
        }
      })
    }
  }
}
