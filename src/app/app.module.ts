import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { ChartsModule } from 'ng2-charts';
import { NgxLoadingModule } from 'ngx-loading';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomMaterialModule } from './material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Error404Component } from './error404/error404.component';
import { TransmisionComponent } from './transmision/transmision.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { LiveComponent } from './live/live.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
@NgModule({
  declarations: [
    AppComponent,
    HomeDashboardComponent,
    MenuComponent,
    DashboardComponent,
    Error404Component,
    TransmisionComponent,
    ConfigurationComponent,
    LiveComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule ,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({}),
    CustomMaterialModule,
    ChartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    FormBuilder,
    FormsModule ,
    AppRoutingModule, // RUTAS
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
