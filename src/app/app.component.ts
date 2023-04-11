import { Component, OnInit } from '@angular/core';
import { Flight } from './flights/flights-list/flights-list.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
