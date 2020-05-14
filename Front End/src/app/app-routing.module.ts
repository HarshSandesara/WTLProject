import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { OrganiserComponent } from './organiser/organiser.component';


const routes: Routes = [
  { path: 'user', component: UserComponent},
  { path: 'user/:id/:name/:email/:password/:type', component: UserComponent},
  { path: 'organiser', component: OrganiserComponent},
  { path: 'organiser/:id/:name/:email/:password/:type', component: OrganiserComponent},
  { path: '**', redirectTo: 'organiser'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
