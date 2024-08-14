import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.modulo';
import { SharedModule } from './shared/shared.modulo';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    RouterModule,
    SharedModule,
    PagesModule,
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: AuthInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
