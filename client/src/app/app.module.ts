import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthlayOutComponent } from './shared/layots/authlay-out/authlay-out.component';
import { BlogLayoutComponent } from './shared/layots/blog-layout/blog-layout.component';
import { RegPageComponent } from './reg-page/reg-page.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/classes/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthlayOutComponent,
    BlogLayoutComponent,
    RegPageComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass:TokenInterceptor}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
