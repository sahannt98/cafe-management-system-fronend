import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlavorFusionComponent } from './flavor-fusion/flavor-fusion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { SPINNER, NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material-module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { FullComponent } from './layout/full/full.component';
import { HeaderComponent } from './layout/full/header/header.component';
import { SidebarComponent } from './layout/full/sidebar/sidebar.component';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor: 'white',
  textPosition: 'center-center',
  bgsColor: 'red',
  fgsColor: 'red',
  fgsType : SPINNER.threeStrings,
  fgsSize : 100,
  hasProgressBar: false
}

@NgModule({
  declarations: [
    AppComponent,
    FlavorFusionComponent,
    HomeComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoginComponent,
    FullComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [HttpClientModule, {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
