import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FlightsComponent } from './flights/flights.component';
import { FlightsListComponent } from './flights/flights-list/flights-list.component';
import { FlightItemComponent } from './flights/flight-item/flight-item.component';
import { HomeComponent } from './home/home.component';
import { FlightEditComponent } from './flights/flight-edit/flight-edit.component';
import { AppRoutingModule } from './app.routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { ReversePipe } from './reverse.pipe';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
