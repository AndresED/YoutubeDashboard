import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { TransmisionComponent } from './transmision/transmision.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { LiveComponent } from './live/live.component';
const routes: Routes = [
  {path: '', component: TransmisionComponent},
  {path: 'transmisition', component: TransmisionComponent},
  {path: 'configuration', component: ConfigurationComponent},
  {path: 'live/:id', component: LiveComponent},
  { path: '**', component: Error404Component}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
