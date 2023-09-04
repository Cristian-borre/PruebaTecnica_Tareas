import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';

// Rutas
const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'inicio', component:InicioComponent, canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InicioComponent,
    NavComponent,
    CardComponent,
    ModalComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }