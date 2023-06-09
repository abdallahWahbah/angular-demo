import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { FlightsComponent } from './flights/flights.component';
import { FlightsListComponent } from './flights/flights-list/flights-list.component';
import { FlightItemComponent } from './flights/flight-item/flight-item.component';
import { HomeComponent } from './home/home.component';
import { FlightEditComponent } from './flights/flight-edit/flight-edit.component';
import { AppRoutingModule } from './app.routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReversePipe } from './reverse.pipe';
import { FlightsService } from './flights/flights.service';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth.interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    FlightsComponent,
    FlightsListComponent,
    FlightItemComponent,
    HomeComponent,
    FlightEditComponent,
    NotFoundComponent,
    ReversePipe,
    HeaderComponent,
    AuthComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    FlightsService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
