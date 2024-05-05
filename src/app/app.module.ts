import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UtilServiceService } from './utils/util-service.service';
import { DigitsOnlyDirective } from './core/directives/digits-only.directive';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DigitsOnlyDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [UtilServiceService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
