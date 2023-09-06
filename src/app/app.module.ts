import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlavorFusionComponent } from './flavor-fusion/flavor-fusion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component'
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SignupComponent } from './signup/signup.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SPINNER, NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';

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
    DashboardComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDialogModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
