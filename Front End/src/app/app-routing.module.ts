import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { OrganiserComponent } from './organiser/organiser.component';


const routes: Routes = [
  { path: 'user', component: UserComponent},
  { path: 'organiser', component: OrganiserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
