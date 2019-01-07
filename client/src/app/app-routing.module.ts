import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { DetailsBookComponent } from './components/details-book/details-book.component';
import { ListBooksComponent } from './components/admin/list-books/list-books.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';

import {AuthGuard} from './guards/auth.guard';
/* 
  canActivate: Sirve para permitir el acceso a una ruta
  canActivateChild: Sirve para dar acceso a una ruta admin/list-book en este caso solo ha admin 
  canDeactivate: ve si un usuario puede salir de una ruta, por ej. en los formularios
  canLoad: evitar que cargue componentes
*/

const routes: Routes = [
  {path: "", component: HomeComponent},
  // Se puede aplicar mas de un guard para mas validaciones 
  {path: "offers", component: OffersComponent, canActivate: [AuthGuard]}, // TODO: only users auth
  {path: "book/:id", component: DetailsBookComponent},
  {path: "admin/list-books", component: ListBooksComponent, canActivate: [AuthGuard]}, // TODO: only users auth
  {path: "user/login", component: LoginComponent},
  {path: "user/register", component: RegisterComponent},
  {path: "user/profile", component: ProfileComponent, canActivate: [AuthGuard]}, // TODO: only users auth
  {path: "**", component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
