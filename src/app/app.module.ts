import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserRegisterComponent } from './components/user-register/user-register.component';
import { LoginComponent } from './components/login/login.component';


import { APP_ROUTES } from './app-routing.module';
import { SnavModule } from './components/snav.module';
import { AuthInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';


// import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    LoginComponent,

  ],
  imports: [
    APP_ROUTES,
    BrowserModule,
    BrowserAnimationsModule,
    SnavModule,
    // AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    // NgxChartsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }