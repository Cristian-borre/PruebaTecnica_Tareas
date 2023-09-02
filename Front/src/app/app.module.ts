import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InicioComponent } from './inicio/inicio.component';

import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { InputComponent } from './input/input.component';

//Rutas
const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'register', component:RegisterComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InicioComponent,
    NavComponent,
    InputComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }