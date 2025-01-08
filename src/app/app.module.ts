import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AgencyListComponent } from './components/agency-list/agency-list.component';
import { RouterModule } from '@angular/router';
import { SearchNamePipe } from './pipename.pipe';
import { SearchStringPipe } from './services/common/pipes/search-string.pipe';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AgencyListComponent,
    SearchNamePipe,
    SearchStringPipe
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    
  ],
  providers: [DatePipe,],
  bootstrap: [AppComponent]
})
export class AppModule { }
