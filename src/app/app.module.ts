import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TelaCadastroComponent } from './tela-cadastro/tela-cadastro.component';
import { TelaLoginComponent } from './tela-login/tela-login.component';

@NgModule({
  declarations: [
    AppComponent,
    TelaInicialComponent,
    TelaCadastroComponent,
    TelaLoginComponent
  ],
  imports: [
    AppRoutingModule,
    
    BrowserModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
