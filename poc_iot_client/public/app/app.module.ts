import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './modules/login/login-module';
import { MainModule } from './modules/main/main-module';
import { BatteryModule } from './modules/battery/battery-module';
import { HttpClientModule } from '@angular/common/http';
import { CommunicationService } from './shared/service/communication/communication-service';
import { SessionService } from './shared/service/session/session-service';
import { FormsModule } from '@angular/forms';
import {
  MaterialModule,
  MdGridListModule,
  Dir,
  MD_PLACEHOLDER_GLOBAL_OPTIONS
} from '@angular/material';

@NgModule({
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    MdGridListModule,
    LoginModule,
    MainModule,
    BatteryModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    CommunicationService,
    SessionService,
    { provide: MD_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'auto' } },
    Dir
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
